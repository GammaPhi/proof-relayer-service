const config = require('./config')
const Lamden = require('lamden-js')


function getVkFromSk(sk) {
    return Lamden.wallet.get_vk(sk);
}

function sendTransaction(
                    contractName,
                    methodName,
                    kwargs,
                    stampLimit,
                    callback) {
    let wallet = {
        sk: config.privateKey,
        vk: getVkFromSk(config.privateKey)
    }
    let network = config.lamden.network;
    let senderVk = wallet.vk;    
    let txInfo = {
        senderVk,
        contractName: contractName,
        methodName, methodName,
        kwargs,
        stampLimit: stampLimit,
    }
    console.log("TxInfo: ");
    console.log(txInfo);
    let tx = new Lamden.TransactionBuilder(network, txInfo);
    const listener = (response) => {
        if (response.errors || response.result) {
            if (callback) {
                tx.events.removeListener('response', listener)
                callback(response, tx);                
            }
        }
    }
    tx.events.on('response', listener)
    tx.send(wallet.sk).then(() => tx.checkForTransactionResult())
}


module.exports = {
    sendTransaction: sendTransaction
}