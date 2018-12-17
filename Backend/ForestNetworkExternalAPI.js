import vstruct, { UInt8, Buffer, UInt64BE, VarBuffer, UInt16BE } from 'varstruct';
import { Keypair } from 'stellar-base';

export const Transaction = vstruct([
    { name: 'version', type: UInt8 },
    { name: 'account', type: Buffer(35) },
    { name: 'sequence', type: UInt64BE },
    { name: 'memo', type: VarBuffer(UInt8) },
    { name: 'operation', type: UInt8 },
    { name: 'params', type: VarBuffer(UInt16BE) },
    { name: 'signature', type: Buffer(64) },
]);

const PostParams = vstruct([
    { name: 'content', type: vstruct.VarBuffer(vstruct.UInt16BE) },
    { name: 'keys', type: vstruct.VarArray(vstruct.UInt8, vstruct.Buffer(42)) },
]);

const PlainTextContent = vstruct([
    { name: 'type', type: vstruct.UInt8 },
    { name: 'text', type: vstruct.VarString(vstruct.UInt16BE) },
]);

var textContent = PlainTextContent;
textContent.type = 1;
textContent.text = "Post a status!"

var postParams = PostParams;
postParams.content = textContent;
postParams.keys = [];

const key = Keypair.fromSecret();

var tx = Transaction;
tx.version = 1;
tx.account = 'GDOU3TTWZ4BEQCUK5QTJ2WNFFN5S3JEUJOO7GA6SJJ5BVJWUAROCZISN';
tx.sequence = 1
tx.memo = Buffer.alloc(0);
tx.operation = 3;
tx.params = postParams;




