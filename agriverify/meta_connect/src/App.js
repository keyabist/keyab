import React, { useState, useEffect } from 'react';
import './App.css';
import WalletCard from './WalletCard';
import QRCode from 'react-qr-code';
import ContractInteractions from './ContractInteractions';

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [certificationDetails, setCertificationDetails] = useState('');  // Add state for certification

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Make sure you have MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length !== 0) {
        const account = accounts[0];
        setCurrentAccount(account);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="App">
      <h1>AgriVerify</h1>
      {currentAccount ? (
        <>
          <WalletCard account={currentAccount} />

          {/* Pass a function to update certification details */}
          <ContractInteractions account={currentAccount} setCertificationDetails={setCertificationDetails} />

          {/* QR Code dynamically updates with certificationDetails */}
          <div style={{ height: "auto", margin: "0 auto", maxWidth: 150, width: "100%" }}>
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={certificationDetails || 'Certification details not found'}  // Dynamic QR code value
              viewBox={`0 0 600 600`}
            />
          </div>
        </>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}

export default App;
