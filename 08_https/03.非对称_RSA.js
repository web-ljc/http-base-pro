/* 
  实现RSA非对称加密算法
  加密用的密钥和解密用的密钥不一样
  两个质数相乘得到一个结果，正向很容易，但给你一个乘积，不知道它们由哪个数乘出来的
  q * p = K
  K = ? * ?
*/

let p = 3, q = 11
let N = p * q // 33 数学上无法从N求出 p 和 q
let fn = (p-1)*(q-1) // 欧拉函数
let e = 7 // 随意挑一个指数e
// {e, N} 就成为我们的公钥，公钥可以发给任何人，公开的 {7, 33}
// 公钥和密钥是一对，公钥加密的数据要用密钥解密，密钥加密的数据要用公钥来解密
// 我们可以从公钥推算私钥，但是要提前知道fn
// e*d%fn===1 就是要找的密钥
for(var d = 1; e * d % fn !== 1; d++) {
  d++
}
console.info(d) // d=3 d是私钥

// 使用
let data = 5
let c = Math.pow(data, e) % N
console.info('c', c)
let original = Math.pow(c, d) % N
console.info(original)