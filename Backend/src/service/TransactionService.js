var request = require('request-promise');
var { decode, encode, sign, encodePostContent, decodePostContent, hash } = require("../../lib/tx");
var { toSimpleTransactionInfo } = require("../mapper/TransactionMapper")
var public_key = 'GDOU3TTWZ4BEQCUK5QTJ2WNFFN5S3JEUJOO7GA6SJJ5BVJWUAROCZISN';
var test = 'GDMNG3PLGUMPHXPPMRZ7EQRMT34F4JU6574OZIQL3LIK5P76CVW5QMTL';
var secret_key = 'SARWVDNIGLM53GQVP34DCG3DSF2FBTKOSMH422VWPXR2AUZH4DWR3KTV';
var getAccountTransactionAPI = 'https://komodo.forest.network/tx_search';
const commitTransaction = (tx) => {
    return `https://komodo.forest.network/broadcast_tx_commit?tx=0x${tx}`;
}

var getAccountTransactionsService = (address) => {
    return new Promise((resolve, rejects) => {
        console.log(address);
        var options = {
            uri: `https://komodo.forest.network/tx_search?query="account=%27${address}%27"`,
            qs: {},
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true
        };
        request(options)
            .then((body) => {
                var result = [];
                body.result.txs.forEach(tx => {
                    result.push(toSimpleTransactionInfo(tx));
                });
                resolve(result);
            })
            .catch((err) => {
                rejects(err);
            });
    })
}
module.exports = { getAccountTransactionsService };
