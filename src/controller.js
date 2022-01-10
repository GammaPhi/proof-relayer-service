
const { getProofForNote } = require('./relayer')
const { sendTransaction } = require('./wallet')
const config = require('./config');


async function withdraw(req, res) {
    console.log(req.body)
    const note = req.body.note;
    const denomination = req.body.denomination;
    const token = req.body.token;
    const recipient = req.body.recipient;
    const contractName = config.lamden.contracts[token][denomination.toString()];
    const proofData = await getProofForNote(note, recipient);
    // submit transaction
    let returned = false
    sendTransaction(
        contractName,
        'withdraw',
        {
            a: proofData.pi_a,
            b: proofData.pi_b,
            c: proofData.pi_c,
            root: proofData.publicSignals[0],
            nullifier_hash: proofData.publicSignals[1],
            recipient: recipient,
            relayer: config.relayer,
            fee: proofData.publicSignals[4],
            refund: proofData.publicSignals[5],
        },
        config.maxStamps,
        (results) => {
            if (returned) {
                return
            }
            returned = true
            console.log(results)
            if (results.errors) {
                res.status(400).json({error: results.errors})
            } else {
                res.json(results)
            }
        }
    )
}


module.exports = {
    withdraw: withdraw
}