const {secp256k1} = require("ethereum-cryptography/secp256k1");
const {toHex} = require("ethereum-cryptography/utils");

const randomPrivateKey = secp256k1.utils.randomPrivateKey()
console.log("private Key: ", toHex(randomPrivateKey))
const publicKey = secp256k1.getPublicKey(randomPrivateKey)
console.log("public Key: ", toHex(publicKey))