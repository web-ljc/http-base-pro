const http = require('http')
const fs = require('fs')

const server = http.createServer()

server.on('request', (req, res) => {
  if(req.url === '/') {
    let html = fs.readFileSync('index.html', 'utf-8')
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Connection': 'close',
      'Link': '</1.png>; as=image; rel-preload'
    })
    res.end(html)
  } else {
    const img = fs.readFileSync('1.png')
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Connection': 'close'
    })
    res.end(img)
  }
})

server.listen('80', () => {
  console.info('start')
})