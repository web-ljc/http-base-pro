const http = require('http')
const fs = require('fs')
const zlib = require('zlib')

const server = http.createServer()

server.on('request', (req, res) => {
  if(req.url === '/') {
    let html = fs.readFileSync('index.html', 'utf-8')
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Content-Encoding': 'gzip'
    })
    res.end(zlib.gzipSync(html))
  }
})

server.listen('80', () => {
  console.info('start')
})