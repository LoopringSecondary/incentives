import * as _ from 'lodash';
import * as assert from 'assert';
import * as BigNumber from 'bignumber.js';
import promisify = require('es6-promisify');

const AirDropContract = artifacts.require('./AirDropContract.sol')
const TestERC20Token = artifacts.require('./TestERC20Token.sol')

contract('AirDropContract', (accounts: string[]) => {

  const owner = accounts[0];
  const sender = accounts[1];

  let testERC20Token: any;
  let airDropContract: any;
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

  const getTransactionReceipt = promisify(web3.eth.getTransactionReceipt);

  before(async () => {
    testERC20Token = await TestERC20Token.deployed();
    airDropContract = await AirDropContract.deployed();
    tokenAddr = testERC20Token.address;
    contractAddr = AirDropContract.address;

    await testERC20Token.setBalance(sender, web3.toWei(200000));
    await testERC20Token.approve(contractAddr, web3.toWei(200000), {from: sender});
  });

  describe('AirDropContract', () => {

    it('should be able to drop token to qulitified recipients', async () => {
      const receipients = [accounts[2], accounts[3], accounts[4]]

      const dropAmount = 3e18;
      const minTokenBalance = 0;
      const maxTokenBalance = 0;
      const minEthBalance = 5e18;
      const maxEthBalance = 50000e18;

      const tx = await airDropContract.drop(tokenAddr, dropAmount, minTokenBalance, maxTokenBalance, minEthBalance, maxEthBalance, receipients, {from: sender});
      // console.log("tx.receipt.logs:", tx.receipt.logs);

      for (let addr of receipients) {
        const ethBalance = await getEthBalanceAsync(addr);
        const tokenBalance = await getTokenBalanceAsync(addr);

        // console.log("ethBalance:", ethBalance.toNumber()/1e18);
        // console.log("tokenBalance:", tokenBalance.toNumber()/1e18);
        assert.equal(tokenBalance.toNumber(), 3e18, "token balance should match drop amount");
      }
    });

  });
})
