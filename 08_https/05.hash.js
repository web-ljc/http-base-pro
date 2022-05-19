/* 
  1, 不同输入有不同的输出
  2, 不能从hash反推输入
  3, 长度固定
*/

function hash(num) {
  return (num % 1024 + '').padStart(4, '0')
}

console.info(hash(1))
console.info(hash(234))
console.info(hash(1025))