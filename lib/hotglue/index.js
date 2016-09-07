const mount = require('koa-mount')
const chokidar = require('chokidar')
const { forEach, uniqueId } = require('lodash')
const path = require('path')
const socketIO = require('socket.io')

let io

module.exports = (relative, opts) => {
  const uid = uniqueId()
  let app

  // Swap out app instance on server file change
  const reloadServer = () => {
    forEach(require.cache, (v, k) => {
      if (!k.match('node_modules')) delete require.cache[k]
    })
    app = require(path.resolve(relative, opts.server.main)).default
    io && io.emit('hotglue reload')
  }
  opts.server.watch.forEach((glob) => {
    chokidar.watch(glob).on('change', () => reloadServer())
  })

  // Emit websocket event to hot load page for server changes
  reloadServer()
  return (ctx, next) => {
    if (ctx.url === '/hotglue-socket-io/socket.io.js') {

    } else {
      return mount(app)(ctx, next)
    }
  }
}
