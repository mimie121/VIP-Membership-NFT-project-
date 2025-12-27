import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // Deploy MembershipNFT
  const MembershipNFT = await ethers.getContractFactory("MembershipNFT");
  const membershipNFT = await MembershipNFT.deploy(deployer.address); 
  console.log("MembershipNFT deployed to:", membershipNFT.target); 

  // Deploy YourContract
  const YourContract = await ethers.getContractFactory("YourContract");
  const yourContract = await YourContract.deploy(deployer.address); 
  console.log("YourContract deployed to:", yourContract.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});