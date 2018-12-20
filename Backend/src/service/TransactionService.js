var request = require('request-promise');
var { decode, encode, sign, encodePostContent, decodePostContent, hash } = require("../../lib/tx");
var { toSimpleTransactionInfo, UPDATE_ACCOUNT_OPERATION } = require("../mapper/TransactionMapper")
var public_key = 'GDOU3TTWZ4BEQCUK5QTJ2WNFFN5S3JEUJOO7GA6SJJ5BVJWUAROCZISN';
var test = 'GDMNG3PLGUMPHXPPMRZ7EQRMT34F4JU6574OZIQL3LIK5P76CVW5QMTL';
var secret_key = 'SARWVDNIGLM53GQVP34DCG3DSF2FBTKOSMH422VWPXR2AUZH4DWR3KTV';
var getAccountTransactionAPI = 'https://komodo.forest.network/tx_search';
const commitTransaction = (tx) => {
    return `https://komodo.forest.network/broadcast_tx_commit?tx=0x${tx}`;
}
const ANONYMOUS_AVT = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAA3NCSVQICAjb4U/gAAAAHlBMVEWgw/9DdOCjxv89cN80a96GqvR4nu9qkuqYu/xVgeQDZY0OAAAAsUlEQVQ4je2SSw7DIAxE8Rd8/wvXRLQCGgOVusxIWeVp8NiT0qOfhJf2WFFjNi0bFJUJAIhYl6Rz0LQkUT6ck7IADTpZbFm4B7nEL1MPkoSWp+DkyDF4OqOn7ixpkXqIvTAcNh5P+M5DVG+92E0jk2SzLGlftNrIA6j1dsP6/yKaXSolNkaUzFzD+Ede82BQFKDx1vc1Rxvu11j42vpwvV4zKDd+l+f0OmpgSPkB/wq+AGGABQw9k9L+AAAAAElFTkSuQmCC=='
const ANONYMOUST_NAME = 'Anonymous'
//get all transactions of an user by address
var getAccountTransactionsService = (address) => {
    return new Promise((resolve, rejects) => {
        console.log(`getting all transaction of address ${address}`);
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

//get current transaction sequence of an user by address
var getCurrentTransactionSequenceService = (address) => {
    return new Promise((resolve, rejects) => {
        console.log(`getting current transaction sequence of address ${address}`);
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

                result = result.filter((info) => {
                    return info.from === address;
                });

                var currentSequence = {
                    sequence: Math.max.apply(Math, result.map((info) => info.sequence))
                };
                console.log(`result: ${currentSequence.sequence}`);
                resolve(currentSequence);
            })
            .catch((err) => {
                rejects(err);
            });
    })
}

var getUserInfoService = (address) => {
    return new Promise((resolve, rejects) => {
        console.log(`getting user info of address ${address}`);
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

                var updateNameTxs = [];
                updateNameTxs = result.filter((info) => {
                    return info.type === UPDATE_ACCOUNT_OPERATION && info.content_type === 'name';
                });

                var updateAvtTxs = [];
                updateAvtTxs = result.filter((info) => {
                    return info.type === UPDATE_ACCOUNT_OPERATION && info.content_type === 'picture';
                });

                var userInfo = {
                    name: getLastestTransaction(updateNameTxs) === null ? ANONYMOUST_NAME
                        : getLastestTransaction(updateNameTxs).content,
                    picture: getLastestTransaction(updateAvtTxs) === null ? ANONYMOUS_AVT
                        : getLastestTransaction(updateAvtTxs).content
                }
                console.log(`result: ${userInfo.name} - ${userInfo.picture} `);
                resolve(userInfo);
            })
            .catch((err) => {
                rejects(err);
            });
    })
}


//an ultil to find lastest transaction by sequence
var getLastestTransaction = (simpleInfos) => {
    if (simpleInfos.length === 0) {
        return null;
    }
    var lastestTx = simpleInfos.reduce((prev, current) => {
        return (prev.sequence > current.sequence) ? prev : current
    });
    return lastestTx;
}

module.exports = { getAccountTransactionsService, getCurrentTransactionSequenceService, getUserInfoService };
