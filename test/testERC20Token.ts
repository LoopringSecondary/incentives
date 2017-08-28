
contract('', (accounts: string[]) => {

  before(async () => {
    console.log("init in before.");
    console.log("acounts:", accounts);
  });

  describe('test1', () => {
    it('true should equal to true', async () => {
      assert.equal(true, true);
    });
  });

})
