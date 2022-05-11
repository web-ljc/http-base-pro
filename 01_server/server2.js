const http = require('http')
const server = http.createServer()

server.on('request', (req, res) => {
  console.info(req.url)
  res.writeHead(200, {
    // 参数 * 通配符, 可以专门设置
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-Test-Cors',
    'Access-Control-Allow-Methods': 'DELETE',
    'Access-Control-Max-Age': 10000
  })
  res.end('555')
})

server.listen('8001', () => {
  console.info('start => http://localhost:8001')
})