let {generateKeyPairSync, createSign, createVerify, createHash } = require('crypto')
/* 
  数字证书：
*/

let passphrase = 'passphrase'
// 服务的公钥私钥
let ServerRsa = generateKeyPairSync('rsa', {
  modulusLength: 1024,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem' // base64格式的私钥
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase // 私钥密码
  }
})
// ca的公钥私钥
let CaRsa = generateKeyPairSync('rsa', {
  modulusLength: 1024,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem' // base64格式的私钥
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase // 私钥密码
  }
})

// 1服务端申请信息，域名 + 公钥
const info = {
  domain: 'http://127.0.0.1:8080',
  publicKey: ServerRsa.publicKey
}
// 把申请信息发给CA机构申请证书
// 2实现的时候签名并不是info，而是hash，性能差，不能计算大量数据
let hash = createHash('sha256').update(JSON.stringify(info)).digest('hex')

// 3用ca私钥进行签名
let sign =  getSign(hash, CaRsa.privateKey, passphrase)

// 证书，客户端会先验证证书合法性，用CA的公钥，然后取出公钥使用
let cert = {
  info,
  sign
}
// 4客户端，获取数字证书后进行验证
let valid = verifySign(hash, sign, CaRsa.publicKey)
console.info('浏览器验证CA的签名', valid)
// 拿到公钥
let serverPublicKey = cert.info.publicKey
// 拿到serverPublicKey后，如果想向服务器发数据，可以进行加密


// 3传入服务的hash内容、ca私钥、密码，进行签名
function getSign(content, privateKey, passphrase) {
  let signObj = createSign('RSA-SHA256') // 签名算法
  signObj.update(content) // 签名内容
  return signObj.sign({
    key: privateKey,
    format: 'pem',
    passphrase
  }, 'hex')
}
// 4传入服务的hash内容， 签名， ca的公钥进行验证
function verifySign(content, sign, publicKey) {
  var verifyObj = createVerify('RSA-SHA256')
  verifyObj.update(content)
  return verifyObj.verify(publicKey, sign, 'hex')
}