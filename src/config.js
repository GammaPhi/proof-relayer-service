require('dotenv').config()

const mainnet = {
  apiLink: "https://blocks.gammaphi.io",
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
      100: 'con_lamnado_currency_100_v1',
      1000: 'con_lamnado_currency_1000_v1',
      10000: 'con_lamnado_currency_10000_v1',
      100000: 'con_lamnado_currency_100000_v1',
    },
    phi: {
      1000: 'con_lamnado_phi_1000_v1',
      10000: 'con_lamnado_phi_10000_v1',
      100000: 'con_lamnado_phi_100000_v1',
      1000000: 'con_lamnado_phi_1000000_v1',
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
    currency: {
      100: 'con_lamnado_currency_100_v1',
      1000: 'con_lamnado_currency_1000_v1',
      10000: 'con_lamnado_currency_10000_v1',
      100000: 'con_lamnado_currency_100000_v1',
    },
    phi: {
      1000: 'con_lamnado_phi_1000_v1',
      10000: 'con_lamnado_phi_10000_v1',
      100000: 'con_lamnado_phi_100000_v1',
      1000000: 'con_lamnado_phi_1000000_v1',
    }
  }
} 

const lamden = process.env.NETWORK === 'mainnet' ? mainnet : testnet

module.exports = {
  port: process.env.PORT || 5000,
  privateKey: process.env.PRIVATE_KEY,
  apiLink: lamden.apiLink,
  relayer: process.env.RELAYER_ADDRESS,
  fees: {
    phi: process.env.WITHDRAW_FEE_PHI,
    currency: process.env.WITHDRAW_FEE_CURRENCY,
  },
  maxStamps: parseInt(process.env.MAX_STAMPS || '5000', 10),  
  lamden: lamden,
  mongoUri: process.env.MONGO_URI
}
