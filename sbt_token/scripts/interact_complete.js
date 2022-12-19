var arra = ["QmcepS3XgbrQQmg2CRHuBMYTQrxesfJN5prYvC9Ecc46iY", "QmdL1uYPKfXXkSUpUvzAgRoC7ZVs4cC2aDo6gjdCndAMNx", "QmfL32ezF4bdvPtWzXT9xRRVN2E3DLBuvu4cfnXWVsikzu", "QmdEEtfVdagmiM5qtYk2XU3ht4FbL5opTohk6MMwCpekCH"]
var accounts = ["0xF0AbbDED14847DEF1b0e57558811beCCceB9cf2b", "0xE9f1Ce5a239b650d47855340DA990F869e9AFd03", "0xa846B6bcAdBf88d227f2DE80E315cea0E9B6eb9d", "0x163BBe27F019e4e9915503ACB9fb5d1e11C414c1"]
const {ethers, BigNumber, Contract, utils} = require("ethers");
require('dotenv').config("../.env")
const SEPOLIA_PROVIDER=new ethers.providers.JsonRpcProvider(process.env.QUICKNODE_HTTP_URL);
const WALLET_ADDRESS = process.env.WALLET_ADDRESS;
const WALLET_PRIVATE_KEY=process.env.PRIVATE_KEY;
const {tokenAddress, abi} = require("../constants/index");

const wallet = new ethers.Wallet(WALLET_PRIVATE_KEY);
const connectedWallet = wallet.connect(SEPOLIA_PROVIDER);
const sbtAddress = "0x29153D87F6fB1B12e595eA735De5253E0acF2f09"
//works only for matic network const sbtAddress = "0x6132eebD28Cb5243b7dF9c6247F4a9D779C1f92B";

async function main(){
    const sbtContract = new ethers.Contract(sbtAddress, abi, SEPOLIA_PROVIDER);
    
    const connectedContract = await sbtContract.connect(connectedWallet);
    for(let i=0; i<arra.length; i++){
        let ipfsurl = "https://gateway.pinata.cloud/ipfs/" + arra[i]
        console.log(ipfsurl)
        let txthis = await connectedContract.safeMint(accounts[i], ipfsurl);//deploying for self
        await txthis.wait();
        console.log(txthis);
    }
}
main();
//Address of SBT maker: 0x6132eebD28Cb5243b7dF9c6247F4a9D779C1f92B