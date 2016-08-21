require('babel-core/register')
const chokidar = require('chokidar')
const path = require('path')
const { forEach } = require('lodash')
const enableDestroy = require('server-destroy')

const dir = process.argv[2]
let server

const restartServer = () => {
  if (server) {
    server.destroy()
    console.log('Closed')
  }
  server = require(path.resolve(dir, 'server.js')).default.listen(3000)
  enableDestroy(server)
  console.log('Listening')
}

restartServer()

chokidar.watch(dir).on('change', (event, path) => {
  forEach(require.cache, (v, k) => {
    if (!k.match('node_modules')) delete require.cache[k]
  })
  restartServer()
})
