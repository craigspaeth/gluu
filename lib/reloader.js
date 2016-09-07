require('babel-core/register')
const chokidar = require('chokidar')
const path = require('path')
const { forEach } = require('lodash')
const enableDestroy = require('server-destroy')
const socketIO = require('socket.io')

const dir = process.argv[2]
let server
let io

const restartServer = () => {
  forEach(require.cache, (v, k) => {
    if (!k.match('node_modules')) delete require.cache[k]
  })
  if (server) server.destroy()
  server = require(path.resolve(dir, 'server.js')).default.listen(3000)
  io = socketIO(server, { path: '/gluu-socket-io' })
  enableDestroy(server)
  console.log('Listening')
}

const onFileChange = (event, path) => {
  io.emit('gluuRefreshCode', path)
  restartServer()
}

process.on('uncaughtException', (err) => {
  console.error(err)
  setTimeout(restartServer, 5000)
})
restartServer()
chokidar.watch(dir).on('change', onFileChange)
