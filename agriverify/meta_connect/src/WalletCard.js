import React, {useState} from 'react'
import {ethers} from 'ethers'

const WalletCard = () => {
    
    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    const [connButtonText, setConnButtonText] = useState('Connect Wallet');
    
    const connectWalletHandler = () => {
        if (window.ethereum) {
            window.ethereum.request({method: 'eth_requestAccounts'})
            .then(result => {
                accountChangedHandler(result[0]);
                setConnButtonText('Wallet Connected');
                getAccountBalance(result[0]);
            })
            .catch(error => {
                setErrorMessage(error.message);
            })
        } else {
            setErrorMessage('Install MetaMask');
        }
    };

    const accountChangedHandler = (newAccount) => {
        setDefaultAccount(newAccount);
        getAccountBalance(newAccount.toString());
    }

    const getAccountBalance = (account) => {
        window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
        .then(balance => {
            setUserBalance(ethers.utils.formatEther(balance));
        })
        .catch(error => {
            setErrorMessage(error.message);
        })
    };

    const chainChangedHandler = () => {
        window.location.reload();
    };

    window.ethereum.on('accountsChanged', accountChangedHandler);

    window.ethereum.on('chainChanged', chainChangedHandler);
    

    return (
        <div className= 'walletCard'>
        <h2>{"Connect to your Metamask Wallet"}</h2>  
            <button onClick={connectWalletHandler}>{connButtonText}</button> 
            <div className='accountDisplay'>
                <h3>Address: {defaultAccount}</h3>
            </div>
            <div className='balanceDisplay'>
                <h3>Balance: {userBalance}</h3>
            </div>
            {errorMessage}
        </div>
    )

}

export default WalletCard;