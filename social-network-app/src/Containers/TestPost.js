const axios = require('axios')
var {encodePostContent,sign,encode} = require("../lib/tx/index");
var {getCurrentTransactionSequenceService} = require("../lib/TransactionService")

var public_key = 'GAO4J5RXQHUVVONBDQZSRTBC42E3EIK66WZA5ZSGKMFCS6UNYMZSIDBI';
var secret_key = 'SARWVDNIGLM53GQVP34DCG3DSF2FBTKOSMH422VWPXR2AUZH4DWR3KTV';

const content = {
    type: 'text',
    text: "Post testing2!"
}

const postParams = {
    content: encodePostContent(content),
    keys: [],
}

getCurrentTransactionSequenceService(public_key).then((kq)=>{
    const Transaction = {
        version: 1,
        account: public_key,
        sequence: kq.sequence + 1,
        memo: Buffer.alloc(0),
        operation: 'post',
        params: postParams
    }
    sign(Transaction, secret_key);
    var txEncoded = encode(Transaction).toString('hex');

axios.post('http://localhost:3002/post', {
 txEncoded: `0x${txEncoded}`
})

})
