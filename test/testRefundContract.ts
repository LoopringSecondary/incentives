import * as _ from 'lodash';
import * as assert from 'assert';
import * as BigNumber from 'bignumber.js';
import promisify = require('es6-promisify');

const RefundContract = artifacts.require('./RefundContract.sol')

contract('RefundContract', (accounts: string[]) => {

  const owner = accounts[0];

  let refundContract: any;
  let contractAddr: string;

  const getEthBalanceAsync = async (addr: string) => {
    const balanceStr = await promisify(web3.eth.getBalance)(addr);
    const balance = new BigNumber(balanceStr);
    return balance;
  };

  const sendTransaction = promisify(web3.eth.sendTransaction);
  const getTransactionReceipt = promisify(web3.eth.getTransactionReceipt);

  before(async () => {

    // const ethBalanceOfOwner = await getEthBalanceAsync(owner);
    // console.log("ethBalanceOfOwner", ethBalanceOfOwner);

    refundContract = await RefundContract.deployed();
    contractAddr = refundContract.address;
    //console.log("contractAddr:", contractAddr);
    await sendTransaction({from: owner, to: contractAddr, value: web3.toWei(1000), gas: 900000});
    const ethBalanceOfContract = await getEthBalanceAsync(contractAddr);
    //console.log("ethBalanceOfContract", ethBalanceOfContract);
  });

  describe('owner ', () => {

    it('should be able to drain anytime', async () => {
      const ethBalanceOfContractBefore = await getEthBalanceAsync(contractAddr);
      await refundContract.drain(web3.toWei(10), {from: owner, gas: 100000});
      const ethBalanceOfContractAfter = await getEthBalanceAsync(contractAddr);

      const subPrecision = (ethBalanceOfContractBefore.toNumber() - ethBalanceOfContractAfter.toNumber()).toPrecision(8);
      assert.equal('1.0000000e+19', subPrecision);
    });


    it('should be able to batchRefund .', async () => {

      const investors = [accounts[3], accounts[4]];

      const ethBalanceBefore0 = await getEthBalanceAsync(investors[0]);
      const ethBalanceBefore1 = await getEthBalanceAsync(investors[1]);
      await refundContract.batchRefund(investors, [web3.toWei(2), web3.toWei(5)], {from: owner, gas: 1000000});

      const ethBalanceAfter0 = await getEthBalanceAsync(investors[0]);
      const ethBalanceAfter1 = await getEthBalanceAsync(investors[1]);

      // console.log("ethBalanceBefore0:", ethBalanceBefore0, "; ethBalanceAfter0:", ethBalanceAfter0);
      // console.log("ethBalanceBefore1:", ethBalanceBefore1, "; ethBalanceAfter1:", ethBalanceAfter1);

      const subPrecision0 = (ethBalanceAfter0.toNumber() - ethBalanceBefore0.toNumber()).toPrecision(8);
      const subPrecision1 = (ethBalanceAfter1.toNumber() - ethBalanceBefore1.toNumber()).toPrecision(8);
      assert.equal('2.0000000e+18', subPrecision0);
      assert.equal('5.0000000e+18', subPrecision1);

    });


  });
})
