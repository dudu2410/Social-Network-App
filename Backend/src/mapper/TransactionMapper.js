var { decode, encode,
    sign, encodePostContent,
    decodePostContent, hash,
    encodeBase32,
    decodeFollowings } = require("../../lib/tx");
const POST_OPERATION = 'post';
const PAYMENT_OPERATION = 'payment';
const CREATE_ACCOUNT_OPERATION = 'create_account';
const UPDATE_ACCOUNT_OPERATION = 'update_account';
const INTERACT_OPERATION = 'interact';


var toSimpleTransactionInfo = (tx) => {
    var txjson = decode(Buffer.from(tx.tx, 'base64'));
    var simpleTransactionInfo = {
        tx_hash: tx.hash,
        type: '',
        content: '',
        content_type: '',
        from: '',
        sequence: 0,
    };
    switch (txjson.operation) {
        case POST_OPERATION: {
            var postContent = decodePostContent(txjson.params.content);
            simpleTransactionInfo.type = POST_OPERATION;
            simpleTransactionInfo.content_type = postContent.type === 1 ? 'text' : 'unknown';
            simpleTransactionInfo.content = postContent.text;
            simpleTransactionInfo.from = txjson.account;
            simpleTransactionInfo.sequence = txjson.sequence;
            
            break;
        }
        case PAYMENT_OPERATION: {
            simpleTransactionInfo.type = PAYMENT_OPERATION;
            simpleTransactionInfo.content_type = 'currency';
            simpleTransactionInfo.content = txjson.params;
            simpleTransactionInfo.from = txjson.account;
            simpleTransactionInfo.sequence = txjson.sequence;
            console.log('END PAYMENT_OPERATION');

            break;
        }
        case CREATE_ACCOUNT_OPERATION: {
            simpleTransactionInfo.type = CREATE_ACCOUNT_OPERATION;
            simpleTransactionInfo.content_type = 'address';
            simpleTransactionInfo.content = txjson.params;
            simpleTransactionInfo.from = txjson.account;
            simpleTransactionInfo.sequence = txjson.sequence;
            break;
        }
        case UPDATE_ACCOUNT_OPERATION: {
            var followings_address = {};
            if (txjson.params.key === 'followings') {
                var decodedAddress = decodeFollowings(txjson.params.value);
                var addresses = [];
                decodedAddress.addresses.forEach((address) => {
                    if (address instanceof Buffer) {
                        try {
                            var afterEncodeBase32Address = encodeBase32(address);
                            if (typeof afterEncodeBase32Address === 'string') {
                                addresses.push(afterEncodeBase32Address);
                            }
                        }
                        catch (err) {
                            console.log(err);
                        }
                    }
                })
                followings_address = {
                    addresses: addresses
                }
            }
            simpleTransactionInfo.type = UPDATE_ACCOUNT_OPERATION;
            simpleTransactionInfo.content_type = txjson.params.key;
            simpleTransactionInfo.content = txjson.params.key === 'name' ? txjson.params.value.toString('utf-8') :
                txjson.params.key === 'followings' ? followings_address :
                    txjson.params.value.toString('base64');
            simpleTransactionInfo.from = txjson.account;
            simpleTransactionInfo.sequence = txjson.sequence;

            break;
        }
        case INTERACT_OPERATION: {
            console.log('INTERACT_OPERATION');
            break;
        }
        default: {

        }
    }
    return simpleTransactionInfo;

}

module.exports = { toSimpleTransactionInfo, UPDATE_ACCOUNT_OPERATION,PAYMENT_OPERATION };
