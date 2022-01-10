require('dotenv').config()

const mainnet = {
  apiLink: "https://mainnet.lamden.io/api",
  addressExplorer: "https://mainnet.lamden.io/addresses",
  network: {
      "name": "Lamden Mainnet", 
      "hosts": ["https://masternode-01.lamden.io"],
      "type": "mainnet", 
      "lamden": true, 
      "currencySymbol": "TAU",
      "blockExplorer": "https://mainnet.lamden.io"
  },
  contracts: {
    currency: {
      '100': 'con_',
      '1000': 'con_',

    },
    phi: {
      1000: 'con_something'
    }
  }
}

const testnet = {
  apiLink: "https://testnet.lamden.io/api",
  addressExplorer: "https://testnet.lamden.io/addresses",
  network: {
      "name": "Lamden Testnet", 
      "hosts": ["https://testnet-master-1.lamden.io"], 
      "type": "testnet", 
      "lamden": true, 
      "currencySymbol": "dTAU",
      "blockExplorer": "https://testnet.lamden.io"
  },
  contracts: {

  }
} 

const lamden = process.env.NETWORK === 'mainnet' ? mainnet : testnet

module.exports = {
  port: process.env.PORT || 5000,
  privateKey: process.env.PRIVATE_KEY,
  masterNodeLink: lamden.network['hosts'][0],
  relayer: process.env.RELAYER_ADDRESS,
  fee: process.env.WITHDRAW_FEE,
  maxStamps: parseInt(process.env.MAX_STAMPS || '5000', 10),
  lamden: lamden,
}
