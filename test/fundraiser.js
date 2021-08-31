const Fundraiser = artifacts.require("Fundraiser");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Fundraiser", function (accounts) {
  let fundraiser;
  const name = 'Nombre de la recaudacion';
  const description = 'Descripcion de la recaudacion. Esto deberia ser un texto algo mas largo';
  const url = 'https://...';
  const imageURL = 'https://...';
  
  const beneficiary = accounts[1];
  const owner = accounts[0];

  beforeEach(async () => {
    fundraiser = await Fundraiser.new(name,description,imageURL,url,beneficiary)
  });

  describe('inicialization', () => {
    it('el nombre de la recaudacion es el que pusimos de inicio', async () => {
      const actual = await fundraiser.name();
      assert.equal(actual, name, 'names should match');   
    });
    it('la descripcion de la recaudacion es el que pusimos de inicio', async () => {
      const actual = await fundraiser.description();
      assert.equal(actual, description, 'descriptions should match');   
    });
    it("el dueño es el que ha deployado el contrato", async () => {
      const actual = await fundraiser.owner();
      assert.equal(actual, owner, "owners should match");
    });
    it("el beneficiario es el que pusimos de inicio", async () => {
      const actual = await fundraiser.beneficiary();
      assert.equal(actual, beneficiary, "beneficiarys should match");
    });
    it("deberia haber 0 donaciones", async () => {
      const actual = await fundraiser.donationsCount();
      assert.equal(actual, 0, "donations count should be 0");
    });
  });




});

