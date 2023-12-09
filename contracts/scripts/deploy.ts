import { ethers } from "hardhat";

async function main() {
  // const MyTokenContract = await ethers.getContractFactory("MyToken");
  // const MyToken = await MyTokenContract.deploy();

  // await MyToken.deployed();

  // console.log(`MyToken deployed to ${MyToken.address}`);
  // const myTokenAddress = MyToken.address;
  const daoGovernorContract = await ethers.getContractFactory("MyGovernor");
  const daoGovernor = await daoGovernorContract.deploy(
    "0xD0De75fee8D22797c4Bb87EA17b1C23c84Dc4760"
  );

  await daoGovernor.deployed();

  console.log(`daoGovernor deployed to ${daoGovernor.address}`);
  const govTokenContract = await ethers.getContractFactory("GovernanceToken");
  const govToken = await govTokenContract.deploy();

  await govToken.deployed();

  console.log(`govToken deployed to ${govToken.address}`);
  // const universalContract = await ethers.getContractFactory("Universal");
  // const universal = await universalContract.deploy(
  //   daoGovernor.address,
  //   govToken.address,
  //   myTokenAddress
  // );

  // await universal.deployed();

  // console.log(`universal deployed to ${universal.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
