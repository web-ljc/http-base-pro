const http = require('http')
const fs = require('fs')
const server = http.createServer()

server.on('request', (req, res) => {
  console.info(req.url)
  if(req.url === '/') {
    const html = fs.readFileSync('index.html', 'utf-8')
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Set-Cookie': ['id=123; max-age=10', 'name=test; httpOnly']
    })
    res.end(html)
  }
})

server.listen('80', () => {
  console.info('start http://localhost')
})