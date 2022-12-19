import { BigNumber, Contract, providers, utils } from "ethers";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import styles from "../styles/Home.module.css";

export default function Home() {
  // walletConnected keep track of whether the user's wallet is connected or not
  const [walletConnected, setWalletConnected] = useState(false);
  // presaleStarted keeps track of whether the presale has started or not
  const web3ModalRef = useRef();
  const zero = BigNumber.from(0);
  const [nftBalance, setNftBalance] = useState(0);
  const [balances, setBalances] = useState({})
  const [swaps, setSwaps] = useState(0);
  // var balances = {};
  /*
      connectWallet: Connects the MetaMask wallet
    */
  const connectWallet = async () => {
    try {
      // Get the provider from web3Modal, which in our case is MetaMask
      // When used for the first time, it prompts the user to connect their wallet
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  const getProviderOrSigner = async (needSigner = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    // If user is not connected to the Rinkeby network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 11155111) {
      window.alert("Change the network to Sepolia");
      throw new Error("Change network to Sepolia");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  useEffect(() => {
    // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
    if (!walletConnected) {
      // Assign the Web3Modal class to the reference object by setting it's `current` value
      // The `current` value is persisted throughout as long as this page is open
      web3ModalRef.current = new Web3Modal({
        network: "sepolia",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, [walletConnected]);

  const implementSwaps = async()=>{
    const signer = await getProviderOrSigner(true);
    const address = await signer.getAddress();
//    console.log(signer);
//    console.log(address);
      if(balances[address]===undefined){
        console.log(balances[address])
        balances[address]=1;
        console.log('first if condn')
      }else{
        console.log(balances[address])
        console.log('second if condn')
        //console.log(balances[address])
        balances[address]+=1;
      }
      setSwaps(balances[address]);
      //onsole.log(balances[address])
  }
  
  const renderButton = () =>{
    if(!walletConnected){
      return(<button onClick={connectWallet}>Conenct Wallet</button>)
    }else{
      return(<div><button onClick = {async ()=>{
        await implementSwaps();
      }}>Swap</button>
      <div>{swaps}</div></div>
      )
    }
  }
  
  const getBalance = async()=>{
    return (0);
    //to use the nft marketplace and a for loop
  }

  return (
    <div>
      <Head>
      </Head>
      <div className={styles.main}>
      <div>{renderButton()}</div>
      </div>
      <footer className={styles.footer}>
        Made with &#10084; by Crypto Devs
      </footer>
    </div>
  );
}