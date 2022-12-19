const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });
const {BigNumber} = require("ethers");
//0xF7fA62d32bEC85d0E54b06550CD967f178c7C52f
async function main() {
    const Samsara = await ethers.getContractFactory("Samsara");
    const deployedSamsara = await Samsara.deploy();
    //the time that is to be actually implemented in the second arg is 1 day = 60*60*24, for now, i am keeping it as 2 minutes, hence it will be like 14 minutes before a proposal is acted upone
    await deployedSamsara.deployed();
    console.log("Address of Samsara NFTs:", deployedSamsara.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
