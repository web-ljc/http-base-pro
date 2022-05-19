let {generateKeyPairSync, createSign, createVerify } = require('crypto')
/* 
  签名：
*/

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
    passphrase: 'passphrase' // 私钥密码
  }
})
// 
let file = 'file'
// 创建签名对象
let signObj = createSign('RSA-SHA256')
// 放入文件内容
signObj.update(file)
// 用rsa签名，输出一个16进制的字符串
let sign = signObj.sign({
  key: rsa.privateKey,
  format: 'pem', // 格式
  passphrase: 'passphrase' // 密钥
}, 'hex')
console.info(sign)

// 穿件验证签名对象
let verifyObj = createVerify('RSA-SHA256')
// 放入文件内容
verifyObj.update(file)
// 验证签名是否合法
let isValid = verifyObj.verify(rsa.publicKey, sign, 'hex')
console.info(isValid)

// 内部如何实现？
// 验证方能到file文件，然后用publickey计算签名，如果根对方的sign匹配验证通过