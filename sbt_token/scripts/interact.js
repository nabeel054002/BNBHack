const {ethers, BigNumber, Contract, utils} = require("ethers");
require('dotenv').config("../.env")
const SEPOLIA_PROVIDER=new ethers.providers.JsonRpcProvider(process.env.QUICKNODE_HTTP_URL);
const WALLET_ADDRESS = process.env.WALLET_ADDRESS;
const WALLET_PRIVATE_KEY=process.env.PRIVATE_KEY;
const {tokenAddress, abi} = require("../constants/index");

const wallet = new ethers.Wallet(WALLET_PRIVATE_KEY);
const connectedWallet = wallet.connect(SEPOLIA_PROVIDER);
const sbtAddress = "0x6132eebD28Cb5243b7dF9c6247F4a9D779C1f92B";

async function main(){
    const sbtContract = new ethers.Contract(sbtAddress, abi, SEPOLIA_PROVIDER);
    
    const connectedContract = await sbtContract.connect(connectedWallet);
    const txthis = await connectedContract.safeMint(WALLET_ADDRESS, "https://gateway.pinata.cloud/ipfs/QmdBSu12vxqzV9JccaaK3PdctnicxhrHcJBeurpUvHLcfS");//deploying for self
    //address to, string memory uri
    await txthis.wait();
    console.log("address of the sbt token contract is ", txthis.address);
}
main();
//Address of SBT maker: 0x6132eebD28Cb5243b7dF9c6247F4a9D779C1f92B