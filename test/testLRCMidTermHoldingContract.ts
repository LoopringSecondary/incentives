import * as BigNumber from 'bignumber.js';
import promisify = require('es6-promisify');

const LRCMidTermHoldingContract = artifacts.require('./LRCMidTermHoldingContract.sol')
const TestERC20Token = artifacts.require('./TestERC20Token.sol')

contract('LRCMidTermHoldingContract', (accounts: string[]) => {

  const sender = accounts[4];
  const ownerAddr = accounts[1];
  const lrcAddr = accounts[2];
  const midTermAddr = accounts[3];

  let testERC20Token: any;
  let midTerm: any;

  const getEthBalanceAsync = async (owner: string) => {
    const balanceStr = await promisify(web3.eth.getBalance)(owner);
    const balance = new BigNumber(balanceStr);
    return balance;
  };

  const getTokenBalanceAsync = async (owner: string) => {
    const tokenBalanceStr = await testERC20Token.balanceOf(owner);
    const balance = new BigNumber(tokenBalanceStr);
    return balance;
  }

  before(async () => {
    testERC20Token = await TestERC20Token.deployed();
    midTerm = await LRCMidTermHoldingContract.deployed();
    testERC20Token.approve(sender, 1000);
    console.log("midTerm.address:", midTerm.address);
  });

  describe('send eth to LRCMidTermHoldingContract', () => {
    it('should be able to transfer lrc token if approved.', async () => {
      const midTermAddr = midTerm.address;

      const balanceStr = await web3.eth.getBalance(sender);
      console.log("balanceStr:", balanceStr);

      //let tx = await web3.eth.sendTransaction({from: sender, to: midTerm.address, value: web3.toWei(1), gas: 500000});

      let tx = await web3.eth.sendTransaction({from: accounts[1], to: midTerm.address, value: web3.toWei(1), gas: 500000});
      // console.log("tx:", tx);

      const ethBalance = await getEthBalanceAsync(midTerm.address);
      console.log("ethBalance", ethBalance);
      const tokenBalance = await getTokenBalanceAsync(sender);
      console.log("tokenBalance", tokenBalance);
    });
  });

})
