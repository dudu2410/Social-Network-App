
var { decode, encode, sign, encodePostContent, decodePostContent, hash } = require("./lib/tx");
var express = require("express");
var app = express();
var server = require("http").createServer(app);
var request = require('request');

server.listen(3001);
var public_key = 'GDOU3TTWZ4BEQCUK5QTJ2WNFFN5S3JEUJOO7GA6SJJ5BVJWUAROCZISN';
var test = 'GDMNG3PLGUMPHXPPMRZ7EQRMT34F4JU6574OZIQL3LIK5P76CVW5QMTL';
var secret_key = 'SARWVDNIGLM53GQVP34DCG3DSF2FBTKOSMH422VWPXR2AUZH4DWR3KTV';
var getAccountTransactionAPI = `https://komodo.forest.network/tx_search?query="account=%27${test}%27"`;
const commitTransaction = (tx) => {
    return `https://komodo.forest.network/broadcast_tx_commit?tx=0x${tx}`;
}

app.get("/", function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ a: 1 }, null, 3));
});
app.get("/vidu", function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send("Day la send chuoi");
});

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

app.get("/get/post", function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    request(getAccountTransactionAPI, function (err, response, body) {
        if (err) {
            console.log(err);
        } else {
            var result = [];
            var json = JSON.parse(body);
            json.result.txs.forEach(tx => {
                var txjson = decode(Buffer.from(tx.tx, 'base64'));
                var post = {
                    type: '',
                    content: '',
                    content_type: '',
                    from: '',
                    to: '',
                    sequence: null,
                };
                switch (txjson.operation) {
                    case 'post': {
                        var postContent = decodePostContent(txjson.params.content);
                        post.type = 'post';
                        post.content_type = postContent.type === 1 ? 'text' : 'unknown';
                        post.content = postContent.text;
                        post.from = txjson.account;
                        post.to = txjson.account;
                        post.sequence = txjson.sequence;
                        break;
                    }
                    case 'payment': {
                        post.type = 'payment';
                        post.content_type = 'currency';
                        post.content = txjson.params.amount;
                        post.from = txjson.account;
                        post.to = txjson.params.address;
                        post.sequence = txjson.sequence;
                        break;
                    }
                    case 'create_account': {
                        post.type = 'create_account';
                        post.content_type = 'address';
                        post.content = txjson.params.address;
                        post.from = txjson.account;
                        post.to = txjson.params.address;
                        post.sequence = txjson.sequence;
                        break;
                    }
                    case 'update_account': {
                        post.type = 'update_account';
                        post.content_type = txjson.params.key;
                        post.content = txjson.params.key === 'name' ? txjson.params.value.toString('utf-8') : txjson.params.value.toString('base64');
                        post.from = txjson.account;
                        post.to = txjson.account;
                        post.sequence = txjson.sequence;
                        break;
                    }
                    case 'interact': {
                        break;
                    }
                    default: {

                    }
                }
                result.push(post);
            });
            res.send(result);
        }
    });
});
