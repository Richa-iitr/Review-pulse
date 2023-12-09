import { ethers } from "hardhat";

async function main() {
  const MyTokenContract = await ethers.getContractFactory("MyToken");
  const MyToken = await MyTokenContract.deploy();

  await MyToken.deployed();

  console.log(`MyToken deployed to ${MyToken.address}`);

  const TimeLockContract = await ethers.getContractFactory("TimeLock");
  const TimeLock = await TimeLockContract.deploy(
    "1",
    ["0xFe643b54727d53C49835f9f6c1a2B9861E741d98"],
    ["0xFe643b54727d53C49835f9f6c1a2B9861E741d98"],
    "0xFe643b54727d53C49835f9f6c1a2B9861E741d98"
  );

  const myTokenAddress = MyToken.address;
  // const daoGovernorContract = await ethers.getContractFactory("MyGovernor");
  // const daoGovernor = await daoGovernorContract.deploy(
  //   MyToken.address,
  //   TimeLock.address
  // );

  // await daoGovernor.deployed();

  // console.log(`daoGovernor deployed to ${daoGovernor.address}`);
  // const govTokenContract = await ethers.getContractFactory("GovernanceToken");
  // const govToken = await govTokenContract.deploy();

  // await govToken.deployed();

  // console.log(`govToken deployed to ${govToken.address}`);
  const universalContract = await ethers.getContractFactory("Universal");
  const universal = await universalContract.deploy(myTokenAddress);

  await universal.deployed();

  console.log(`universal deployed to ${universal.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
