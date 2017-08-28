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

  before(async () => {
    testERC20Token = await TestERC20Token.deployed();
    midTerm = await LRCMidTermHoldingContract.deployed();
    tokenAddr = testERC20Token.address;
    contractAddr = midTerm.address;

    await testERC20Token.setBalance(sender, web3.toWei(20000));
    await testERC20Token.approve(contractAddr, web3.toWei(1000), {from: sender});

    await web3.eth.sendTransaction({from: owner, to: contractAddr, value: web3.toWei(10000), gas: 100000});

    const _tokenAddrInMidTerm = await midTerm.lrcTokenAddress.call();
    const _ownerInMidTerm = await midTerm.owner.call();
    console.log(testERC20Token.address, owner);
    console.log(_tokenAddrInMidTerm, _ownerInMidTerm);

  });

  describe('send eth to LRCMidTermHoldingContract', () => {
    it('should be able to transfer lrc token if approved.', async () => {
      const closed = await midTerm.closed.call({from: owner});
      const depositStartTime = await midTerm.depositStartTime.call();
      const depositStopTime = await midTerm.depositStopTime.call();
      const WITHDRAWAL_DELAY = await midTerm.WITHDRAWAL_DELAY.call();
      const WITHDRAWAL_WINDOW = await midTerm.WITHDRAWAL_WINDOW.call();

      console.log("closed:", closed);
      console.log("depositStartTime:", depositStartTime);
      console.log("depositStopTime:", depositStopTime);
      console.log("WITHDRAWAL_DELAY:", WITHDRAWAL_DELAY);
      console.log("WITHDRAWAL_WINDOW:", WITHDRAWAL_WINDOW);

      await sendTransaction({from: sender, to: contractAddr, value: 0, gas: 500000});

      const ethBalance = await getEthBalanceAsync(midTerm.address);
      console.log("ethBalance", ethBalance);
      const tokenBalance = await getTokenBalanceAsync(sender);
      console.log("tokenBalance", tokenBalance);
    });
  });

})
