require('dotenv').config();
//const HDWalletProvider = require('truffle-hdwallet-provider-privkey');
const HDWalletProvider = require("@truffle/hdwallet-provider");
//const HDWalletProvider = require('truffle-hdwallet-provider-privkey');
const PRIVATE_KEY = process.env.PRIVATE_KEY || ""
const MATIC_URL = process.env.MATIC_URL || ""
const MUMBAI_URL = process.env.MUMBAI_URL || ""
const GOERLI_URL = process.env.GOERLI_URL || ""
const ETHER_SCAN_API = process.env.ETHER_SCAN_API || ""

module.exports = {
   plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: ETHER_SCAN_API
  },
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
      //gas: 672197500
      gas: 7984452, // Block Gas Limit same as latest on Mainnet https://ethstats.net/
      gasPrice: 2000000000, // same as latest on Mainnet https://ethstats.net/
    },
    kovan: {
      provider: function() {
        return new HDWalletProvider(
          PRIVATE_KEY,
          `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`
        )
      },
      gas: 6109322,
      gasPrice: 25000000000,
      network_id: 42
    },
    mumbai: {
      provider: function() {
        return new HDWalletProvider(
          PRIVATE_KEY,
          `${MUMBAI_URL}`
        )
      },
      //gas: 6109322,
      //gasPrice: 25000000000,
      network_id: 80001,
      confirmations: 0,
      skipDryRun: true
    },
    matic: {
      //provider: function () {
        //return new HDWalletProvider(MNEMONIC, `https://rpc-mainnet.maticvigil.com/v1/${API_KEY}`);
      //},
      provider: function() {
        return new HDWalletProvider(
          PRIVATE_KEY,
          `${MATIC_URL}`
        )
      },
      network_id: 137,
      //gas: 6109322,
      //gasPrice: 5000000000,
      confirmations: 2,
    },
    goerli: {
      //provider: function () {
        //return new HDWalletProvider(MNEMONIC, `https://rpc-mainnet.maticvigil.com/v1/${API_KEY}`);
      //},
      provider: function() {
        return new HDWalletProvider(
          PRIVATE_KEY,
          `${GOERLI_URL}`
        )
      },
      network_id: 5,
      //gas: 29970600,
      //gasPrice: 5000000000,
      confirmations: 0,
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },


    // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.7",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
       settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200
       },
      //  evmVersion: "byzantium"
      }
    }
  },
  /*
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  */
  /*
  solc: {
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },*/

 
  db: {
    enabled: false
  }
};
