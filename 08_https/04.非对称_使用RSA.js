let {generateKeyPairSync, privateEncrypt, publicDecrypt } = require('crypto')

// 生成一对密钥对，一个是公钥，一个是私钥
let rsa = generateKeyPairSync('rsa', {
  modulusLength: 1024,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem' // base64格式的私钥
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: 'passphrase'
  }
})

let message = 'hello99'
// 加密
let encryptMsg =  privateEncrypt({
  key: rsa.privateKey,
  passphrase: 'passphrase'
}, Buffer.from(message, 'utf-8'))
console.info('encryptMsg', encryptMsg)

// 解密
let decryptedMsg = publicDecrypt(rsa.publicKey, encryptMsg)
console.info('decryptedMsg', decryptedMsg.toString())