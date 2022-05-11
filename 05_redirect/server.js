const http = require('http')
const fs = require('fs')

const server = http.createServer()

server.on('request', (req, res) => {
  if(req.url === '/') {
    res.writeHead(302, {
      'Location': '/new'
    })
    res.end('')
  }
  if(req.url === '/new') {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    res.end('<div>1</div>')
  }
})

server.listen('80', () => {
  console.info('start')
})