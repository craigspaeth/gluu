require('babel-core/register')
const chokidar = require('chokidar')
const path = require('path')
const glob = require('glob')

let server

const restartServer = () => {
  if (server) {
    server.close()
    console.log('Closed')
  }
  server = require(path.resolve(__dirname, 'server.js')).default.listen(3000)
  console.log('Listening')
}

restartServer()

chokidar
  .watch(__dirname, { ignored: /[\/\\]\./ })
  .on('change', (event, path) => {
    glob(`${__dirname}/${'**/*.js'}`, (err, files) => {
      if (err) throw err
      files.forEach((file) => {
        console.log('del', file, !!require.cache[file])
        delete require.cache[file]
      })
      restartServer()
    })
  })
