import * as _ from 'lodash';
import * as assert from 'assert';
import * as BigNumber from 'bignumber.js';
import promisify = require('es6-promisify');

const LRCMidTermHoldingContract = artifacts.require('./LRCMidTermHoldingContract.sol')
const TestERC20Token = artifacts.require('./TestERC20Token.sol')

contract('LRCMidTermHoldingContract', (accounts: string[]) => {

  const owner = accounts[0];
  const sender = accounts[1];

  let testERC20Token: any;
  let midTerm: any;
  let tokenAddr: string;
  let contractAddr: string;

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
    midTerm = await LRCMidTermHoldingContract.deployed();
    tokenAddr = testERC20Token.address;
    contractAddr = midTerm.address;

    await testERC20Token.setBalance(sender, web3.toWei(200000));
    await sendTransaction({from: owner, to: contractAddr, value: web3.toWei(10000), gas: 100000});

    const _tokenAddrInMidTerm = await midTerm.lrcTokenAddress.call();
    const _ownerInMidTerm = await midTerm.owner.call();
  });

  describe('LRCMidTermHoldingContract: ', () => {
    it('user should not be able to start program .', async () => {
      try {
        await midTerm.start({from: sender, gas: 500000});
        throw new Error('start by user, not owner.');
      } catch (err) {
        //console.log("err:", err);
        assert(true, 'start by user should have thrown');
      }
    });

    it('owner should be able to start program .', async () => {
      const depositStartTime = await midTerm.depositStartTime.call();
      assert.equal(depositStartTime.toNumber(), 0, 'depositStartTime should be 0 before start.');
      await midTerm.start({from: owner, gas: 500000});
      const depositStartTimeAfter = await midTerm.depositStartTime.call();
      assert(depositStartTimeAfter.toNumber() > 0, 'depositStartTime should greater than 0 before start.');
    });

    it('should be able to deposite lrc token after approved during deposit window .', async () => {
      const closed = await midTerm.closed.call({from: owner});
      const depositStartTime = await midTerm.depositStartTime.call();
      const depositStopTime = await midTerm.depositStopTime.call();
      console.log("depositStartTime:", new Date(depositStartTime.toNumber() * 1000));
      console.log("depositStopTime:", new Date(depositStopTime.toNumber() * 1000));

      const ethBalanceOfContract = await getEthBalanceAsync(contractAddr);

      let lrcAmount = web3.toWei(150000);
      //console.log("lrcAmount:", lrcAmount);
      const tokenBalanceBefore = await getTokenBalanceAsync(contractAddr);
      const ethBalanceBefore = await getEthBalanceAsync(sender);

      await testERC20Token.approve(contractAddr, lrcAmount, {from: sender});
      let tx = await sendTransaction({from: sender, to: contractAddr, value: 0, gas: 500000});
      let txRecipient = await getTransactionReceipt(tx);
      let gasPrice: number = web3.eth.gasPrice * Math.pow(10, 9);
      const txGas: number = gasPrice * txRecipient.gasUsed;

      const tokenBalanceAfter = await getTokenBalanceAsync(contractAddr);
      const ethBalanceAfter = await getEthBalanceAsync(sender);
      //console.log("ethBalanceAfter:", ethBalanceAfter);

      const tokenOfContractIncreased: number = tokenBalanceAfter.toNumber() - tokenBalanceBefore.toNumber();
      assert.equal(tokenOfContractIncreased, lrcAmount, "token amount error");

      let ethOfSenderIncreased: number = ethBalanceAfter.toNumber() - ethBalanceBefore.toNumber() + txGas;
      ethOfSenderIncreased = ethOfSenderIncreased / 1e+18;
      let ethOfSenderIncreasedFixed = ethOfSenderIncreased.toFixed(2);
      let ethAmountExpected = (lrcAmount/(7500*1e+18)).toFixed(2);
      console.log("ethOfSenderIncreasedFixed:", ethOfSenderIncreasedFixed);
      console.log("ethAmountExpected:",  ethAmountExpected);
      assert.equal(ethOfSenderIncreasedFixed, ethAmountExpected, "eth amount error");
    });

    it('should not be able to withdraw lrc during withdrawal delay period', async () => {
      await advanceBlockTimestamp(60);

      const lrcSaved = await midTerm.getLRCAmount(sender);
      console.log("lrcSaved:", lrcSaved);
      const ethAmount = lrcSaved.toNumber()/7500;
      try {
        await sendTransaction({from: sender, to: contractAddr, value: ethAmount, gas: 500000});
        throw new Error("send eth to mid-term contract during withdrawal delay period should hava thrown");
      } catch (err) {
        const errMsg = `${err}`;
        console.log("errMsg:", errMsg);
        assert(_.includes(errMsg, 'invalid opcode'), `Expected contract to throw, got: ${err}`);
      }
    });


    it('should be able to get lrc back during withdrawal window', async () => {
      await advanceBlockTimestamp(180);

      const lrcSaved = await midTerm.getLRCAmount(sender);
      console.log("lrcSaved:", lrcSaved);
      const ethAmount = lrcSaved.toNumber()/7500;

      const lrcBalanceBefore = await getTokenBalanceAsync(sender);
      console.log("lrcBalanceBefore:", lrcBalanceBefore);
      await sendTransaction({from: sender, to: contractAddr, value: ethAmount, gas: 500000});
      const lrcBalanceAfter = await getTokenBalanceAsync(sender);

      const lrcSavedPrecision = lrcSaved.toNumber().toPrecision(8);
      const lrcWithdrawedPrecision = (lrcBalanceAfter.toNumber() - lrcBalanceBefore.toNumber()).toPrecision(8);
      console.log("lrcSavedPrecision:", lrcSavedPrecision);
      console.log("lrcWithdrawedPrecision:", lrcWithdrawedPrecision);
      assert.equal(lrcSavedPrecision, lrcWithdrawedPrecision, "withdraw lrc acmount error");
    });

    it('should not be able to withdraw lrc after withdrawal window period', async () => {
      await advanceBlockTimestamp(90);

      try {
        await sendTransaction({from: sender, to: contractAddr, value: web3.toWei(0.1), gas: 500000});
        throw new Error("send eth to mid-term contract after withdrawal period should hava thrown");
      } catch (err) {
        const errMsg = `${err}`;
        console.log("errMsg:", errMsg);
        assert(_.includes(errMsg, 'invalid opcode'), `Expected contract to throw, got: ${err}`);
      }
    });

  });
})
