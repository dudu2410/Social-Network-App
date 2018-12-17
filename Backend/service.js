
var { decode } = require("./lib/tx");
var express = require("express");
var app = express();
var server = require("http").createServer(app);
var request = require('request');

server.listen(3001);
var public_key = 'GDOU3TTWZ4BEQCUK5QTJ2WNFFN5S3JEUJOO7GA6SJJ5BVJWUAROCZISN';
var getAccountTransactionAPI = `https://komodo.forest.network/tx_search?query="account=%27${public_key}%27"`;



app.get("/", function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ a: 1 }, null, 3));
});
app.get("/vidu", function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send("Day la send chuoi");
});

app.get("/post", function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(req.query.hash);
});

app.get("/get/post", function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    request(getAccountTransactionAPI, function (err, response, body) {
        if (err) {
            console.log(err);
        } else {
            var result = [];
            var json = JSON.parse(body);
            json.result.txs.forEach(tx => {
                result.push(decode(Buffer.from(tx.tx,'base64')));
            });
            res.send(result);
        }
    });
});
