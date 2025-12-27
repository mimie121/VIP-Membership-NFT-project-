import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployMembership: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("MembershipNFT", {
    from: deployer,
    args: [], // ✅ NO constructor args
    log: true,
  });
};

export default deployMembership;
deployMembership.tags = ["MembershipNFT"];
