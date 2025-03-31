# Blockchain Transaction DApp

![Project Banner](https://github.com/Wesley534/web3/blob/main/client/images/banner.png)

A decentralized application (DApp) built with React and Ethers.js to send and display Ethereum transactions using a custom smart contract. Currently runs locally with Ganache for development, with plans to support Ethereum testnets like Sepolia.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)


## Overview
This project is a blockchain-based transaction platform where users can:
- Connect their MetaMask wallet to manage accounts securely.
- Send ETH transactions with custom messages and keywords to any Ethereum address.
- View a real-time history of all transactions stored on the blockchain.

It showcases smart contract development with Solidity, frontend integration with Ethers.js, and a user-friendly React interface.

## Features
- **Wallet Connection**: Seamlessly connect to MetaMask for account management.
- **Transaction Sending**: Send ETH with a message and keyword (e.g., 0.0005 ETH, "hello", "test").
- **Transaction History**: Displays all past transactions with details like sender, receiver, amount, and timestamp.
- **Local Development**: Uses Ganache for a local Ethereum blockchain during development.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS 
- **Blockchain**: Ethereum, Ethers.js (v6)
- **Smart Contract**: Solidity (v0.8.0), Hardhat
- **Local Node**: Ganache (port 7545, chain ID 5777)
- **Wallet**: MetaMask

## Screenshots
### Wallet Connection
![Wallet Connection](https://github.com/Wesley534/web3/blob/main/client/images/connectwallet.png)
*Connecting MetaMask to the DApp.*

### Sending a Transaction
![Send Transaction](https://github.com/Wesley534/web3/blob/main/client/images/sendcrypto.png)
*Sending 0.0005 ETH with message "hello" and keyword "a gift for you".*

### Request to confirm Transaction
![Confrim Transaction](https://github.com/Wesley534/web3/blob/main/client/images/transrequest.png)
*Sending 0.0005 ETH with message "hello" and keyword "a gift for you".*

### Transaction History
![Transaction History](https://github.com/Wesley534/web3/blob/main/client/images/trans%20history.png)
*Viewing transaction history, including tx 0xf89287bd... from 0x2eb3...5d2f to 0x77f2...6Fc7.*

