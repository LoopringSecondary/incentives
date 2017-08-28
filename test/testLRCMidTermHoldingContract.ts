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

  describe('send eth to LRCMidTermHoldingContract', () => {
    it('should be able to transfer lrc token after approved during deposit window .', async () => {
      // const closed = await midTerm.closed.call({from: owner});
      // const depositStartTime = await midTerm.depositStartTime.call();
      // const depositStopTime = await midTerm.depositStopTime.call();
      // const WITHDRAWAL_DELAY = await midTerm.WITHDRAWAL_DELAY.call();
      // const WITHDRAWAL_WINDOW = await midTerm.WITHDRAWAL_WINDOW.call();
      const ethBalanceOfContract = await getEthBalanceAsync(contractAddr);
      console.log("ethBalanceOfContract:", ethBalanceOfContract);

      let lrcAmount = web3.toWei(150000);
      console.log("lrcAmount:", lrcAmount);
      const tokenBalanceBefore = await getTokenBalanceAsync(contractAddr);
      const ethBalanceBefore = await getEthBalanceAsync(sender);
      console.log("ethBalanceBefore: ", ethBalanceBefore);

      await testERC20Token.approve(contractAddr, lrcAmount, {from: sender});
      let tx = await sendTransaction({from: sender, to: contractAddr, value: 0, gas: 500000});
      let txRecipient = await getTransactionReceipt(tx);
      let gasPrice: number = web3.eth.gasPrice * Math.pow(10, 9);
      console.log("gasPrice:", gasPrice);
      //console.log("txRecipient: ", txRecipient);

      const txGas: number = gasPrice * txRecipient.gasUsed;
      console.log("txGas:", txGas);

      const tokenBalanceAfter = await getTokenBalanceAsync(contractAddr);
      const ethBalanceAfter = await getEthBalanceAsync(sender);
      console.log("ethBalanceAfter:", ethBalanceAfter);

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

    it('should be able to get lrc back during withdrawal window', async () => {
      await advanceBlockTimestamp(60 + 180);
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

  });

})
