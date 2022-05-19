let crypto = require('crypto')
let content = '123456'
// md5
let md5Hash = crypto.createHash('md5').update(content).update(content).digest('hex')
console.info('md5Hash', md5Hash, md5Hash.length) // 32

// sha256
let salt = 123456
let shaHash = crypto.createHash('sha256', salt).update(content).update(content).digest('hex')
console.info('shaHash', shaHash, shaHash.length) // 32

