import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractAddress, contractABI } from '../utils/constants';

export const TransactionContext = React.createContext();

const getEthereumContract = async () => {
  if (!window.ethereum) {
    alert("Please install MetaMask!");
    return null;
  }
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
  console.log({ provider, signer, transactionContract });
  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
  const [transactions, setTransactions] = useState([]);
  const [transactionCount, setTransactionCount] = useState(0);

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const getAllTransactions = async () => {
    try {
      if (!window.ethereum) return alert('Please install MetaMask');
      const transactionsContract = await getEthereumContract();
      if (!transactionsContract) return;
      const availableTransactions = await transactionsContract.getAllTransactions();
      console.log("Raw transactions:", availableTransactions);

      const structuredTransactions = availableTransactions.map((transaction) => ({
        addressTo: transaction.receiver,
        addressFrom: transaction.sender,
        timestamp: new Date(Number(transaction.timestamp) * 1000).toLocaleString(),
        message: transaction.message,
        keyword: transaction.keyword,
        amount: ethers.formatEther(transaction.amount), // Convert BigInt to ETH string
      }));

      setTransactions(structuredTransactions);
      console.log("Transactions fetched:", structuredTransactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions([]);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!window.ethereum) return alert('Please install MetaMask');
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        await getAllTransactions();
        console.log("Connected account:", accounts[0]);
      } else {
        console.log('No accounts found');
      }
    } catch (error) {
      console.error("Error checking wallet connection:", error);
    }
  };

  const checkIfTransactionsExist = async () => {
    try {
      const transactionsContract = await getEthereumContract();
      if (!transactionsContract) return;
      const currentTransactionCount = await transactionsContract.getTransactionCount();
      console.log("Raw transaction count:", currentTransactionCount.toString());
      setTransactionCount(Number(currentTransactionCount));
      window.localStorage.setItem('transactionCount', currentTransactionCount.toString());
    } catch (error) {
      console.error("Error checking transactions:", error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return alert('Please install MetaMask');
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setCurrentAccount(accounts[0]);
      console.log("Wallet connected:", accounts[0]);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const sendTransaction = async () => {
    try {
      if (!window.ethereum) return alert('Please install MetaMask');
      const { addressTo, amount, keyword, message } = formData;
      const transactionsContract = await getEthereumContract();
      if (!transactionsContract) throw new Error("Contract not initialized");
      const parsedAmount = ethers.parseEther(amount);
      console.log("Calling addToBlockchain with:", { addressTo, parsedAmount: parsedAmount.toString(), keyword, message });
      const tx = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword, {
        value: parsedAmount
      });
      console.log("Transaction sent:", tx.hash);
      await tx.wait();
      console.log("Transaction confirmed:", tx.hash);
      await getAllTransactions();
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionsExist();
  }, []);

  return (
    <TransactionContext.Provider value={{ 
      connectWallet, 
      currentAccount, 
      formData, 
      setFormData, 
      handleChange, 
      sendTransaction, 
      transactions, 
      transactionCount 
    }}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;