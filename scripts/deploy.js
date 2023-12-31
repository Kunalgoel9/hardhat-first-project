// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers, run, network } = require("hardhat");

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying contract...");
  const simpleStorage = await SimpleStorageFactory.deploy();

  await simpleStorage.waitForDeployment();
  // await simpleStorage.deployed();
  const address = await simpleStorage.getAddress();
  console.log(`Deployed contract to: ${address}`);
  // console.log(network.config);

  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_KEY) {
    await simpleStorage.deploymentTransaction().wait(6);
    await verify(address, []);
  }

  const currentvalue = await simpleStorage.retrieve();
  console.log("current value :" + currentvalue);

  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait(1);

  const updatedvalue = await simpleStorage.retrieve();
  console.log("Updated value: " + updatedvalue);
}

async function verify(contractAddress, args) {
  console.log("Verifying contract ...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!");
    } else {
      console.log(e);
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
