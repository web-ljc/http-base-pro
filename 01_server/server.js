const http = require('http')

let server = http.createServer()


server.on('request', (req, res) => {
  console.info(req)
  res.end('123')
})

server.listen('80', () => {
  console.info('start => http://localhost/')
})