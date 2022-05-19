let N = 23
let p = 5
let secret1 = 6
let A = Math.pow(p, secret1) % N
console.info('p=', p, 'N=', N, 'A=', A)
// p= 5 N= 23 A= 8

let secret2 = 15
let B = Math.pow(p, secret2) % N
console.info('p=', p, 'N=', N, 'B=', B)
// p= 5 N= 23 B= 19

console.info(Math.pow(B, secret1) % N) // 2
console.info(Math.pow(A, secret2) % N) // 2
