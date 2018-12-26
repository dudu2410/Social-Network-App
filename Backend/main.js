
var { getAccountTransactionsService,
     getCurrentTransactionSequenceService,
    getUserInfoService,
    getCurrentBlockHeightService ,
    getAllTransactionOfBlockByHeightService} = require("./src/service/TransactionService");
var express = require("express");
var app = express();
var server = require("http").createServer(app);
var request = require('request');

var public_key = 'GAO4J5RXQHUVVONBDQZSRTBC42E3EIK66WZA5ZSGKMFCS6UNYMZSIDBI';
var test = 'GDMNG3PLGUMPHXPPMRZ7EQRMT34F4JU6574OZIQL3LIK5P76CVW5QMTL';
var secret_key = 'SARWVDNIGLM53GQVP34DCG3DSF2FBTKOSMH422VWPXR2AUZH4DWR3KTV';
var getAccountTransactionAPI = `https://komodo.forest.network/tx_search?query="account=%27${test}%27"`;
const commitTransaction = (tx) => {
    return `https://komodo.forest.network/broadcast_tx_commit?tx=0x${tx}`;
}
server.listen(3002);
console.log('server listening on port 3002');


app.get("/", function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ a: 1 }, null, 3));
});
app.get("/vidu", function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send("Day la send chuoi");
});

//this is test service
app.get("/post", function (req, res) {


    const content = {
        type: 'text',
        text: "Post testing!"
    }

    const postParams = {
        content: encodePostContent(content),
        keys: [],
    }

    const Transaction = {
        version: 1,
        account: public_key,
        sequence: 1,
        memo: Buffer.alloc(0),
        operation: 'post',
        params: postParams
    }
    sign(Transaction, secret_key);
    var txEncoded = encode(Transaction).toString('hex').toUpperCase();
    // var txDecoded = decode(txEncoded);
    res.setHeader('Content-Type', 'application/json');
    request(commitTransaction(txEncoded), (err, response, body) => {
        console.log(commitTransaction(txEncoded));
        console.log(err);
        res.send(body);
    })
});

//get all transaction of a user by address (public-key)
//example: localhost:3002/get/transactions?address=GDOU3TTWZ4BEQCUK5QTJ2WNFFN5S3JEUJOO7GA6SJJ5BVJWUAROCZISN
app.get("/get/transactions", function (req, res) {
    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    getAccountTransactionsService(req.query.address)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send(err);
        });
});


//get current transaction sequence of a user by address (public-key)
//example: localhost:3002/get/current_sequence?address=GDOU3TTWZ4BEQCUK5QTJ2WNFFN5S3JEUJOO7GA6SJJ5BVJWUAROCZISN
app.get("/get/current_sequence", function (req, res) {
    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    getCurrentTransactionSequenceService(req.query.address)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send(err);
        })
});

//get current user info  of a user by address (public-key)
//example: localhost:3002/get/current_user_info?address=GDOU3TTWZ4BEQCUK5QTJ2WNFFN5S3JEUJOO7GA6SJJ5BVJWUAROCZISN
app.get("/get/current_user_info", function (req, res) {
    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    getUserInfoService(req.query.address)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send(err);
        })
});

app.get("/get/current_block_height", function (req, res) {
    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    getCurrentBlockHeightService()
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send(err);
        })
});


app.get("/get/transaction_of_block", function (req, res) {
    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    getAllTransactionOfBlockByHeightService(req.query.height)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send(err);
        })
});