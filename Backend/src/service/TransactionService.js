"use strict";
var axios = require('axios');
var { decode, encode, sign, encodePostContent, decodePostContent, hash } = require("../../lib/tx");
var { toSimpleTransactionInfo, UPDATE_ACCOUNT_OPERATION, PAYMENT_OPERATION } = require("../mapper/TransactionMapper")
var public_key = 'GDOU3TTWZ4BEQCUK5QTJ2WNFFN5S3JEUJOO7GA6SJJ5BVJWUAROCZISN';
var test = 'GDMNG3PLGUMPHXPPMRZ7EQRMT34F4JU6574OZIQL3LIK5P76CVW5QMTL';
var secret_key = 'SARWVDNIGLM53GQVP34DCG3DSF2FBTKOSMH422VWPXR2AUZH4DWR3KTV';
var getAccountTransactionAPI = 'https://komodo.forest.network/tx_search';
const server1 = 'https://komodo.forest.network';
const server2 = 'https://zebra.forest.network';
const server3 = 'https://dragonfly.forest.network';
const server4 = 'https://gorilla.forest.network';
const current_server = server1;
const commitTransaction = (tx) => {
    return `${current_server}/broadcast_tx_commit?tx=0x${tx}`;
}
const ANONYMOUS_AVT = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAA3NCSVQICAjb4U/gAAAAHlBMVEWgw/9DdOCjxv89cN80a96GqvR4nu9qkuqYu/xVgeQDZY0OAAAAsUlEQVQ4je2SSw7DIAxE8Rd8/wvXRLQCGgOVusxIWeVp8NiT0qOfhJf2WFFjNi0bFJUJAIhYl6Rz0LQkUT6ck7IADTpZbFm4B7nEL1MPkoSWp+DkyDF4OqOn7ixpkXqIvTAcNh5P+M5DVG+92E0jk2SzLGlftNrIA6j1dsP6/yKaXSolNkaUzFzD+Ede82BQFKDx1vc1Rxvu11j42vpwvV4zKDd+l+f0OmpgSPkB/wq+AGGABQw9k9L+AAAAAElFTkSuQmCC'
const ANONYMOUST_NAME = 'Anonymous'

var postTransactionService = (tx)=> {
    return new Promise((resolve, rejects) => {
        console.log(`posting a transaction to server`);
        var uri = `${current_server}/tx_search?query="account=%27${address}%27"`;
        axios.get(commitTransaction(tx))
            .then((body) => {
                resolve(body.data);
            })
            .catch((err) => {
                rejects(err);
            });
    });
}

//get all transactions of an user by address
var getAccountTransactionsService = (address) => {
    return new Promise((resolve, rejects) => {
        console.log(`getting all transaction of address ${address}`);
        var uri = `${current_server}/tx_search?query="account=%27${address}%27"`;
        axios.get(uri)
            .then((body) => {
                var resultSet = [];
                body.data.result.txs.forEach(tx => {
                    resultSet.push(toSimpleTransactionInfo(tx.tx));
                });
                resolve(resultSet);
            })
            .catch((err) => {
                rejects(err);
            });
    });
}

//get current transaction sequence of an user by address
var getCurrentTransactionSequenceService = (address) => {
    return new Promise((resolve, rejects) => {
        console.log(`getting current transaction sequence of address ${address}`);
        var uri = `${current_server}/tx_search?query="account=%27${address}%27"`;
        axios.get(uri)
            .then((body) => {
                var result = [];
                body.data.result.txs.forEach(tx => {
                    result.push(toSimpleTransactionInfo(tx.tx));
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

//get user info by address
var getUserInfoService = (address) => {
    return new Promise((resolve, rejects) => {
        console.log(`getting user info of address ${address}`);
        var uri = `${current_server}/tx_search?query="account=%27${address}%27"`;
        axios.get(uri)
            .then((body) => {
                var result = [];
                body.data.result.txs.forEach(tx => {
                    result.push(toSimpleTransactionInfo(tx.tx));
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
                        : getLastestTransaction(updateAvtTxs).content,
                    followings: getAllFollowingsOfUser(result),
                    currency: getCurrentCurrencyOfUser(result, address),
                }
                console.log(`result: ${userInfo.name} - ${userInfo.picture} `);
                resolve(userInfo);
            })
            .catch((err) => {
                rejects(err);
            });
    })
}

var getCurrentBlockHeightService = () => {
    return new Promise((resolve, rejects) => {
        console.log(`getting current block height`);
        var uri = `${current_server}/block`;
        axios.get(uri)
            .then((body) => {
                resolve(body.data.result.block_meta.header.height);
            })
            .catch((err) => {
                console.log(err);
                rejects(err);
            });
    })
}

var getAllTransactionOfBlockByHeightService = (height) => {
    return new Promise((resolve, rejects) => {
        console.log(`getting all transactions of block has height ${height}`);
        var uri = `${current_server}/block?height=${height}`;
        axios.get(uri)
            .then((body) => {
                var txs = body.data.result.block.data.txs;
                var result = [];
                if (txs !== null) {
                    txs.forEach((tx)=>{
                        result.push(toSimpleTransactionInfo(tx));
                    })
                }
                resolve(result);
            })
            .catch((err) => {
                console.log(err);
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

//get all followings of user 
var getAllFollowingsOfUser = (txArray) => {
    if (txArray.length === 0) {
        return [];
    }
    var followingsArray = [];
    var updateFollowingsTxs = [];
    updateFollowingsTxs = txArray.filter((info) => {
        return info.type === UPDATE_ACCOUNT_OPERATION && info.content_type === 'followings';
    });
    updateFollowingsTxs.forEach((tx) => {
        followingsArray = followingsArray.concat(tx.content.addresses);
    })
    followingsArray = getUniqueArray(followingsArray);
    return followingsArray;
}

//get Current currency of user
var getCurrentCurrencyOfUser = (txArray, usrAddress) => {
    var result = {
        amount: 0
    }
    if (txArray.length === 0) {
        return result;
    }
    var recieveCurrency = 0;
    var sendCurrency = 0;
    var paymentTxs = [];
    paymentTxs = txArray.filter((info) => {
        return info.type === PAYMENT_OPERATION;
    });
    paymentTxs.forEach((tx) => {
        if (tx.from !== usrAddress) {
            recieveCurrency += tx.content.amount;
        }
        if (tx.from === usrAddress) {
            sendCurrency += tx.content.amount;
        }
    })
    var currentCurrency = recieveCurrency - sendCurrency;
    result.amount = currentCurrency;
    return result;
}

//an util to get unique item array
var getUniqueArray = (array) => {
    return array.filter((v, i, a) => a.indexOf(v) === i);
}

module.exports = {
    getAccountTransactionsService,
    getCurrentTransactionSequenceService,
    getUserInfoService,
    getCurrentBlockHeightService,
    getAllTransactionOfBlockByHeightService,
    postTransactionService
};
