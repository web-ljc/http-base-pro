const http = require('http')
const fs = require('fs')

const server = http.createServer()

server.on('request', (req, res) => {
  if(req.url === '/') {
    const html = fs.readFileSync('index.html', 'utf-8')
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Content-Security-Policy': 'default-src \'self\' from-action \'self\'; report-uri /report'
    })
    res.end(html)
  } else {
    res.writeHead(200, {
      'Content-Type': 'application/javascript',
    })
    res.end('console.log("loaded sc")')
  }
})

server.listen('80', () => {
  console.info('start')
})