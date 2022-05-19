/* 
  对称加密：AES  
  加密和解密的密钥是相同密钥

  node加密模块 crypto
*/

let crypto = require('crypto')

/*
  data 数据
  key 密钥
  iv 向量
*/
function encrypt(data, key, iv) {
  let cipher = crypto.createCipheriv('aes-128-cbc', key, iv)
  cipher.update(data)
  return cipher.final('hex') // 16进行，把结果输出成16进制字符串
}
function decrypt(data, key, iv) {
  let cipher = crypto.createDecipheriv('aes-128-cbc', key, iv)
  cipher.update(data, 'hex') // 添加hex，十六进制的字符串数据
  return cipher.final('utf-8') // 输出成utf8字符串
}
let key = '1234567890123456' // 16位
let iv = '1234567890123456' // 向量
let data = 'hello' // 数据

let encryptData = encrypt(data, key, iv)
console.info(encryptData)
let decryptData = decrypt(encryptData, key, iv)
console.info(decryptData)


