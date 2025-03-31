require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  networks: {
    ganache: {
      url: process.env.GANACHE_RPC_URL || "http://127.0.0.1:7545",
      chainId: parseInt(process.env.GANACHE_CHAIN_ID) || 1337,
      accounts: [process.env.GANACHE_PRIVATE_KEY]
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "https://sepolia.infura.io/v3/YOUR_INFURA_KEY",
      chainId: parseInt(process.env.SEPOLIA_CHAIN_ID) || 11155111,
      accounts: [process.env.SEPOLIA_PRIVATE_KEY]
    }
  }
};