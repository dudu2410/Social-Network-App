
var { getAccountTransactionsService, getCurrentTransactionSequenceService, getUserInfoService } = require("./src/service/TransactionService");
var express = require("express");
var {encodePostContent,sign,encode} = require("./lib/tx/index");
var app = express();
var server = require("http").createServer(app);
var request = require('request');
const bodyParser = require('body-parser')

var public_key = 'GAO4J5RXQHUVVONBDQZSRTBC42E3EIK66WZA5ZSGKMFCS6UNYMZSIDBI';
var test = 'GDMNG3PLGUMPHXPPMRZ7EQRMT34F4JU6574OZIQL3LIK5P76CVW5QMTL';
var secret_key = 'SARWVDNIGLM53GQVP34DCG3DSF2FBTKOSMH422VWPXR2AUZH4DWR3KTV';
var getAccountTransactionAPI = `https://komodo.forest.network/tx_search?query="account=%27${test}%27"`;
const commitTransaction = (tx) => {
    return `https://komodo.forest.network/broadcast_tx_commit?tx=${tx}`;
}
server.listen(3002);
console.log('server listening on port 3002');

app.use(bodyParser.urlencoded({
    extended: true
  }))
  
app.use(bodyParser.json())

app.post("/", function (req, res) {
    console.log(req.body.todo);
});
app.get("/", function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    console.log(req.status);
console.log(req.responseText);
});

//this is test service
app.post("/post", function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    request(commitTransaction(req.body.txEncoded), (err, response, body) => {
        console.log(commitTransaction(req.body.txEncoded));
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
