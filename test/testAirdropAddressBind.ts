import * as assert from 'assert';
import promisify = require('es6-promisify');

const LRxAirdropAddressBinding = artifacts.require('./LRxAirdropAddressBinding.sol')

contract('LRxAirdropAddressBinding', (accounts: string[]) => {

  const owner = accounts[0];
  const user1 = accounts[1];
  const user2 = accounts[2];

  let airdropAddressBind: any;

  before(async () => {
    airdropAddressBind = await LRxAirdropAddressBinding.deployed();
  });

  describe('user', () => {
    it('should be able to bind a address to a project id', async () => {
      const projectId = 1;
      const neoAddr = "NEO-ADDR-01";

      await airdropAddressBind.bind(projectId, neoAddr, {from: user1});
      const addrBound = await airdropAddressBind.getBindingAddress(user1, projectId);
      assert.equal(addrBound, neoAddr, "address binded not equal to original.");

      const neoAddr2 = "NEO-ADDR-02";
      await airdropAddressBind.bind(projectId, neoAddr2, {from: user1});
      const addrBound2 = await airdropAddressBind.getBindingAddress(user1, projectId);
      assert.equal(addrBound2, neoAddr2, "address binded not equal to original.");
    });

  });

  describe('owner', () => {
    it('should be able to set a project name', async () => {
      const projectId = 1;
      const projectName = "NEO";

      await airdropAddressBind.setProjectName(projectId, projectName, {from: owner});
      const prjectNameOnChain = await airdropAddressBind.projectNameMap(projectId);
      console.log("prjectNameOnChain: ", prjectNameOnChain);
      assert.equal(prjectNameOnChain, projectName, "project name set not equal to original.");
    });

  });

})
