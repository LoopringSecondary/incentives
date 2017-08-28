
/*

  Copyright 2017 Loopring Project Ltd (Loopring Foundation).

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.

*/

import * as assert from 'assert';
import * as BigNumber from 'bignumber.js';
import { BNUtils } from '../utils/bn_utils';
import { testUtils } from '../utils/test_utils';
import Web3 = require('web3');
import promisify = require('es6-promisify');
// import ethUtil = require('ethereumjs-util');

const { add, sub, mul, div, toSmallestUnits } = BNUtils;
const web3Instance: Web3 = web3;

contract('LRCLongTermHoldingContract', (accounts: string[]) => {

	const sendTransaction = promisify(web3Instance.eth.sendTransaction);
	const getEthBalance = promisify(web3Instance.eth.getBalance);
	const getTransactionReceipt = promisify(web3Instance.eth.getTransactionReceipt);

	const TestERC20Token = artifacts.require('TestERC20Token');
	const LRCLongTermHoldingContract = artifacts.require('LRCLongTermHoldingContract');

	const owner = accounts[0];
	const user = accounts[1];

	const INITIAL_USER_LRC_BALANCE = toSmallestUnits(1000000);
	const INITIAL_LRC_BONUS = toSmallestUnits(500000);

	let tokenContract: any;
	let programContract: any;
	let programAddress: string

	before(async () => {
		console.log("Testing LRCLongTermHoldingContract stated ...");
		console.log("acounts:", accounts);

		[tokenContract, programContract] = await Promise.all([
			TestERC20Token.deployed(),
			LRCLongTermHoldingContract.deployed(),
		]);

		programAddress = LRCLongTermHoldingContract.address;

		const [user_lrc, bonus_lrc] = await Promise.all([
			tokenContract.setBalance(user, INITIAL_USER_LRC_BALANCE),
			tokenContract.setBalance(programAddress, INITIAL_LRC_BONUS)
		]);

	});

	describe('internalCalculateBonus method', () => {
		it('should calculate bonus correctly', async () => {


			{
				let totalBonus = toSmallestUnits(1000000);
				let deposited = toSmallestUnits(1000000);
				const bonus = await programContract.internalCalculateBonus(
					totalBonus, deposited, toSmallestUnits(1000000));
				assert.equal(toSmallestUnits(1000000).cmp(bonus), 0);
			}

			{
				let totalBonus = toSmallestUnits(1000000);
				let deposited = toSmallestUnits(1000000);
				const bonus = await programContract.internalCalculateBonus(
					totalBonus, deposited, toSmallestUnits(10000));
				// console.log('bonus: ' + bonus + ' ' + toSmallestUnits(7420));
				// 7.498942093324559E+21
				assert.equal(bonus.cmp(toSmallestUnits(7420)), -1);
				assert.equal(bonus.cmp(toSmallestUnits(7419)), 1);
			}

			{
				let totalBonus = toSmallestUnits(10);
				let deposited = toSmallestUnits(10);
				const bonus = await programContract.internalCalculateBonus(
					totalBonus, deposited, toSmallestUnits(1));
				// console.log('bonus: ' + bonus + ' ' + toSmallestUnits(8667, 14));
				// 7.498942093324559E+16
				assert.equal(bonus.cmp(toSmallestUnits(8667, 14)), -1);
				assert.equal(bonus.cmp(toSmallestUnits(8666, 14)), 1);
			}

		});
	});

	describe('user', () => {

		async function advanceBlockTimestamp(days: number) {
			const seconds = 3600 * 24 * days;
			await web3.currentProvider.send({ jsonrpc: "2.0", method: "evm_increaseTime", params: [seconds], id: 0 })
			await web3.currentProvider.send({ jsonrpc: "2.0", method: "evm_mine", params: [], id: 0 });
		}

		it('should be able to deposit and withdrawal LRC token', async () => {
			// Check initial LRC balances
			assert.equal(INITIAL_USER_LRC_BALANCE.cmp(await tokenContract.balanceOf.call(user)), 0);
			assert.equal(INITIAL_LRC_BONUS.cmp(await tokenContract.balanceOf.call(programAddress)), 0);

			await programContract.start({from: owner});

			// User send a 0 ETH to contract without allowance should cause error to throw.
			try {
				await sendTransaction({ from: user, to: programAddress, value: 0, gas: 300000 });
				throw new Error('Expected throw not found');
			} catch (err) {
				testUtils.assertThrow(err);
			}

			// User approve allowance for programAddress
			const lrcAmount = toSmallestUnits(200000);
			await tokenContract.approve(programAddress, lrcAmount, { from: user });
			assert.equal((await tokenContract.allowance.call(user, programAddress)).cmp(lrcAmount), 0);

			// User send a 0 ETH to contract to make LRC deposit
			await sendTransaction({ from: user, to: programAddress, value: 0, gas: 300000 });

			assert.equal(toSmallestUnits(800000).cmp(await tokenContract.balanceOf.call(user)), 0);
			assert.equal(toSmallestUnits(700000).cmp(await tokenContract.balanceOf.call(programAddress)), 0);
			assert.equal(toSmallestUnits(700000).cmp(await programContract.lrcBalance.call()), 0);
			assert.equal(toSmallestUnits(200000).cmp(await programContract.lrcDeposited.call()), 0);


			// Simulate 60 days (DEPOSIT_PERIOD) after initial deployment
			advanceBlockTimestamp(60);

			// A user who hasn't participated should NOT be able to withdraw LRC
			try {
				await sendTransaction({ from: accounts[2], to: programAddress, value: 0, gas: 300000 });
				throw new Error('Expected throw not found');
			} catch (err) {
				testUtils.assertThrow(err);
			}

			// A user who has participated should NOT be able to withdraw LRC neither
			try {
				await sendTransaction({ from: user, to: programAddress, value: 0, gas: 300000 });
				throw new Error('Expected throw not found');
			} catch (err) {
				testUtils.assertThrow(err);
			}

			// Simulate 540 days after initial deployment
			advanceBlockTimestamp(540 - 60);

			// A user who hasn't participated should NOT be able to withdraw LRC
			try {
				await sendTransaction({ from: accounts[2], to: programAddress, value: 0, gas: 300000 });
				throw new Error('Expected throw not found');
			} catch (err) {
				testUtils.assertThrow(err);
			}


			{
				// A user who has participated should  be able to make a partial LRC withdraw.
				// 0.01 ETH will make a 10,0000 LRC withdrawal
				const ethAmount = web3Instance.toWei(0.01, 'ether');
				const lrcBalance = INITIAL_LRC_BONUS.plus(lrcAmount);

				const lrcWithdralwalBase = toSmallestUnits(100000);
				const lrcDeposited = await programContract.lrcDeposited.call();
				const lrcBonus = await programContract.internalCalculateBonus.call(toSmallestUnits(500000), lrcDeposited, lrcWithdralwalBase);

				// console.log('lrc bonus: ' + lrcBonus.toString());
				const lrcNewBalance = lrcBalance.minus(lrcWithdralwalBase).minus(lrcBonus);

				await sendTransaction({ from: user, to: programAddress, value: ethAmount, gas: 300000 });

				// console.log(await tokenContract.balanceOf.call(programAddress));
				// console.log(await tokenContract.balanceOf.call(user));

				assert.equal(lrcNewBalance.cmp(await tokenContract.balanceOf.call(programAddress)), 0);
				assert.equal(lrcNewBalance.cmp(await programContract.lrcBalance.call()), 0);
			}


			{
				// A user who has participated should be able to make a full LRC withdraw.
				const ethAmount = web3Instance.toWei(0, 'ether');

				await sendTransaction({ from: user, to: programAddress, value: ethAmount, gas: 300000 });

				// console.log(await tokenContract.balanceOf.call(programAddress));
				// console.log(await tokenContract.balanceOf.call(user));

				assert.equal(INITIAL_USER_LRC_BALANCE.plus(INITIAL_LRC_BONUS).cmp(await tokenContract.balanceOf.call(user)), 0);
				assert.equal(toSmallestUnits(0).cmp(await tokenContract.balanceOf.call(programAddress)), 0);
				assert.equal(toSmallestUnits(0).cmp(await programContract.lrcBalance.call()), 0);
			}
		});
	});

})
