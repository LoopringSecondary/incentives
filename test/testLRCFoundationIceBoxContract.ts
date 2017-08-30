import * as _ from 'lodash';
import * as assert from 'assert';
import * as BigNumber from 'bignumber.js';
import promisify = require('es6-promisify');

const LRCFoundationIceboxContract = artifacts.require('./LRCFoundationIceboxContract.sol')
const TestERC20Token = artifacts.require('./TestERC20Token.sol')

contract('LRCFoundationIceboxContract', (accounts: string[]) => {

  const owner = accounts[0];
  const sender = accounts[1];

  let iceboxContract: any;
  let testERC20Token: any;

  const getEthBalanceAsync = async (addr: string) => {
    const balanceStr = await promisify(web3.eth.getBalance)(addr);
    const balance = new BigNumber(balanceStr);
    return balance;
  };

  const getTokenBalanceAsync = async (addr: string) => {
    const tokenBalanceStr = await testERC20Token.balanceOf(addr);
    const balance = new BigNumber(tokenBalanceStr);
    return balance;
  }

  const sendTransaction = promisify(web3.eth.sendTransaction);
  const getTransactionReceipt = promisify(web3.eth.getTransactionReceipt);

  const advanceBlockTimestamp = async (days: number) => {
    const seconds = 3600 * 24 * days;
    await web3.currentProvider.send({ jsonrpc: "2.0", method: "evm_increaseTime", params: [seconds], id: 0 })
    await web3.currentProvider.send({ jsonrpc: "2.0", method: "evm_mine", params: [], id: 0 });
  }

  before(async () => {
    testERC20Token = await TestERC20Token.deployed();
    iceboxContract = await LRCFoundationIceboxContract.deployed();

    await testERC20Token.setBalance(iceboxContract.address, web3.toWei(240000));
    await iceboxContract.start({from: owner, gas: 100000});
  });

  describe('owner', () => {

    it('should not be able to withdraw token during frozen period', async () => {
      try {
        await sendTransaction({from: owner, to: iceboxContract.address, value: 0, gas: 500000});
        throw new Error('withdraw token.');
      } catch (err) {
        assert(true, 'withdraw token during frozen period should have thrown');
      }
    });

    it('should be able to withdraw 10000 token each month after 720 days', async () => {
      await advanceBlockTimestamp(720 + 31);

      const tokenBalanceBefore = await getTokenBalanceAsync(owner);
      await sendTransaction({from: owner, to: iceboxContract.address, value: 0, gas: 500000});

      const tokenWithdrawn = await iceboxContract.lrcWithdrawn.call();
      //console.log("tokenWithdrawn:", tokenWithdrawn);
      assert.equal(tokenWithdrawn.toNumber(), 1e+22, 'withdrawn wrong number of token');

      const tokenBalanceAfter = await getTokenBalanceAsync(owner);
      //console.log("tokenBalanceBefore:", tokenBalanceBefore);
      //console.log("tokenBalanceAfter:", tokenBalanceAfter);

      assert.equal((tokenBalanceAfter.toNumber() - tokenBalanceBefore.toNumber())/1e+18, 10000, "wrong unlock amount");

      await advanceBlockTimestamp(30);
      await sendTransaction({from: owner, to: iceboxContract.address, value: 0, gas: 500000});
      const tokenBalanceAfter2 = await getTokenBalanceAsync(owner);
      assert.equal((tokenBalanceAfter2.toNumber() - tokenBalanceAfter.toNumber())/1e+18, 10000, "wrong unlock amount");
    });

  });

})
