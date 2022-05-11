const http = require('http')
const fs = require('fs')

let server = http.createServer()


server.on('request', (req, res) => {
  console.info(req.url)
  if(req.url === '/') {
    let html = fs.readFileSync('index.html', 'utf-8')
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'expires': '2022-02-02',
      'cache-control': 'pbuilc'
    })
    res.end(html)
  }
  if(req.url === '/script.js') {
    // 校验Etag配置
    const etag = req.headers['if-none-match']
    if(etag === '777') {
      // 协商缓存返回头304，通过设置Last-Modified，Etag
      res.writeHead(304, {
        'Content-type': 'text/javascript',
        'Cache-Control': 'max-age=20000, no-store',
        'Last-modifined': '123',
        'Etag': '777'
      })
      res.end('777')
    } else {
      // 强缓存200，通过设置expires、Cache-Control
      res.writeHead(200, {
        'Content-Type': 'text/javascript',
        'Cache-Control': 'max-age=2000000, no-cache',
        // 'expires': '2023-10-12',
        'Last-modified': '123',
        'Etag': '777'
      })
      res.end('console.log("script loader3333")')
    }
  }
})

server.listen('80', () => {
  console.info('start => http://localhost/')
})