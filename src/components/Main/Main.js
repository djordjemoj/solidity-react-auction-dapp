import React, { useState, useEffect } from 'react';
import AuctionList from '../AuctionList/AuctionList.js'; 
import CreateAuctionModal from '../CreateAuctionModal/CreateAuctionModal.js'; 
import Web3 from 'web3';
import './Main.css';
const auctionFactoryAddress = "0xef1caE58F594Fa4eF00C8563AD3ab35750c91E6E";
const sepoliaRPCUrl = 'https://sepolia.infura.io/v3/cde52bf4681c4b84a5f5b68ff60ed81a';

const Main = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        console.log("Connected to Ethereum account: ", accounts[0]);
        window.ethereum.on('accountsChanged', (newAccounts) => {
          setAccount(newAccounts[0]);
          console.log("Switched to account: ", newAccounts[0]);
        });
      } else {
        console.log("MetaMask is not installed.");
      }
    } catch (error) {
      console.error("Error connecting to MetaMask: ", error);
    }
  };
  

  useEffect(() => {
    const web3Instance = new Web3(sepoliaRPCUrl);
    setWeb3(web3Instance);
    connectWallet();
    console.log("Web3 instance set up: ", web3);
  }, []);

  return (
    <div className="main-container">
      {!account && (
        <button className="connect-wallet-button" onClick={connectWallet}>
          Poveži se sa MetaMaskom
        </button>
      )}
      
      <AuctionList className="auction-list" web3={web3} account={account} auctionFactoryAddress={auctionFactoryAddress}/>
      <button className="create-auction-button" onClick={() => setShowCreateModal(true)}>
        Napravi Aukciju
      </button>
      {showCreateModal && (
        <CreateAuctionModal className="create-auction-modal" web3={web3} account={account} onClose={() => setShowCreateModal(false)} auctionFactoryAddress = {auctionFactoryAddress}/>
      )}
      
    </div>
  );
}

export default Main;