/* 
  加密一段字符‘abc’，通过密钥处理，所有字母均向后移动3位，得到密文‘def’
  - 加密方法 encrypt
  - 解密方法 decrypt

  - 消息 ‘abc’ 
  - 密钥 3
  - 密文 ‘def’
*/
let secret = 3

function encrypt(message) {
  let buffer = Buffer.from(message)
  for(let i = 0; i < message.length; i++) {
    buffer[i] = buffer[i] + secret
  }
  return buffer.toString()
}

function decrypt(message) {
  let buffer = Buffer.from(message)
  for(let i = 0; i < message.length; i++) {
    buffer[i] = buffer[i] - secret
  }
  return buffer.toString()
}

let message = 'abc'
let encryptMessage = encrypt(message)
console.info('encryptMessage', encryptMessage)
let decryptMessage = decrypt(encryptMessage)
console.info('decryptMessage', decryptMessage)