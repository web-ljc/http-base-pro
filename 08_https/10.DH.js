let {createDiffieHellman} = require('crypto')

// 客户端
let client = createDiffieHellman(512)
let clientKeys = client.generateKeys() // A

let prime = client.getPrime() // p
let generator = client.getGenerator() // N

// 服务端
let server = createDiffieHellman(prime, generator)
let serverkeys = server.generateKeys() // B

let client_secret = client.computeSecret(serverkeys)
let server_secret = server.computeSecret(clientKeys)

console.info(client_secret.toString('hex'), server_secret.toString('hex'))

