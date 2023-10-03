const { ethers } = require("hardhat");
const { aspect, assert } = require("chai");
describe("SimpleStorage", function () {
  let SimpleStorageFactory;
  let SimpleStorage;

  beforeEach(async function () {
    SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    SimpleStorage = await SimpleStorageFactory.deploy();
  });

  it("Should start with a favourite number of 0", async function () {
    const currentvalue = await SimpleStorage.retrieve();
    const expectedvalue = "0";
    assert.equal(currentvalue.toString(), expectedvalue);
  });
  it("Should update when we call store", async function () {
    const expectedvalue = "7";
    const transactionResponse = await SimpleStorage.store(expectedvalue);
    await transactionResponse.wait(1);
    const currentValue = await SimpleStorage.retrieve();
    assert.equal(currentValue.toString(), expectedvalue);
  });
});
