const vstruct = require('varstruct');
const crypto = require('crypto');
const { Keypair } = require('stellar-base');
const v1 = require('./v1');

const Transaction = vstruct([
  { name: 'version', type: vstruct.UInt8 },
]);

const PostContent = vstruct([
  { name: 'type', type: vstruct.UInt8 },
]);

const reactType = vstruct([
  { name: 'type', type: vstruct.UInt8 },
]);

function encode(tx) {
  switch (tx.version) {
    case 1:
      return v1.encode(tx);

    default:
      throw Error('Unsupport version');
  };
}

function decode(data) {
  const versionTx = Transaction.decode(data);
  switch (versionTx.version) {
    case 1:
      return v1.decode(data);
      break;

    default:
      throw Error('Unsupport version');
  }
}

function getUnsignedHash(tx) {
  return crypto
    .createHash('sha256')
    .update(encode({
      ...tx,
      signature: Buffer.alloc(64, 0),
    }))
    .digest();
}

function sign(tx, secret) {
  const key = Keypair.fromSecret(secret);
  tx.account = key.publicKey();
  tx.signature = key.sign(getUnsignedHash(tx));
}

function verify(tx) {
  const key = Keypair.fromPublicKey(tx.account);
  return key.verify(getUnsignedHash(tx), tx.signature);
}

function hash(tx) {
  return tx.hash = crypto.createHash('sha256')
    .update(encode(tx))
    .digest()
    .toString('hex')
    .toUpperCase();
}

function encodePostContent(content) {
  var type;
  switch (content.type) {
    case 'text':
      type = 1;
      break;
    default:
      throw Error('Unsupport content type');
  }
  return v1.encodePlainTextContent({
    type: type,
    text: content.text
  })
}

function decodePostContent(data) {
  var contentType = {};
  try {
    contentType = PostContent.decode(data);
  }
  catch (err) {
    console.log(err);
    return { type: -1, text: '' };
  }
  switch (contentType.type) {
    case 1:
      return v1.decodePlainTextContent(data);
    default:
      return { type: -1, text: '' };
  }
}


function decodeReactContent(data) {
  var contentType = {};
  try {
    contentType = reactType.decode(data);
    console.log(contentType);
  }
  catch (err) {
    console.log(err);
    return { type: -1 };
  }
  switch (contentType.type) {
    case 1:
      console.log(data);
      var decoded;
      try {
        decoded = v1.decodePlainTextContent(data);
      }
      catch (err) {
        console.log(err);
        return { type: -1 }
      }
      return decoded;
    case 2:
      console.log(data);
      var decoded;
      try {
        decoded = v1.decodeReactContent(data);
      }
      catch (err) {
        console.log(err);
        return { type: -1 }
      }
      return decoded;
    default:
      return { type: -1 };
  }
}



function encodeFollowings(value) {
  return v1.encodeFollowsValue(value);
}

function decodeFollowings(data) {
  var decoded;
  try{
    decoded = v1.decodeFollowsValue(data);
  }
  catch(err){
    console.log(err);
    return {addresses:[]};
  }
  return decoded;
}

function decodeBase32(data) {
  return v1.decodeBase32(data);
}

function encodeBase32(data) {
  return v1.encodeBase32(data);
}

module.exports = {
  encode,
  decode,
  verify,
  sign,
  hash,
  encodePostContent,
  decodePostContent,
  encodeFollowings,
  decodeFollowings,
  decodeBase32,
  encodeBase32,
  decodeReactContent
};
