const { task } = require("hardhat/config");

task("block-number", "Print current block number").setAction(
  async (taskArgs, hre) => {
    const blocknumber = await hre.ethers.provider.getBlockNumber();
    console.log(`BlockNumber is: ${blocknumber}`);
  }
);

module.exports = {};
