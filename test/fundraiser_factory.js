const FundraiserFactory = artifacts.require("FundraiserFactory");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("FundraiserFactory", function (/* accounts */) {
  it("should assert true", async function () {
    await FundraiserFactory.deployed();
    return assert.isTrue(true);
  });
});

contract("FundraiserFactory : crear una recaudacion de fondos", (accounts) =>{
  let fundraiserFactory;
  const name = 'Nombre de la subasta';
  const description = 'Nombre de la subasta. Esto deberia ser una string mas larga';
  
})
