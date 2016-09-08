const Koa = require('koa')
const mount = require('koa-mount')
const chokidar = require('chokidar')
const { forEach } = require('lodash')
const path = require('path')
const WebSocketServer = require('ws').Server
const cheerio = require('cheerio')
const fs = require('fs')
const convert = require('koa-convert')
const browserify = require('browserify-dev-middleware')

const wss = new WebSocketServer({ port: 1234 })
const fname = path.resolve(__dirname, './client.js')
const reloaderScript = fs.readFileSync(fname, 'utf8')

wss.broadcast = (data) => wss.clients.forEach((client) => client.send(data))

const bmiddleware = (opts) => {
  return convert((ctx, next) => {
    return new Promise((resolve, reject) => {
      const next = (err) => {
        if (err) reject(err)
        else resolve()
      }
      const send = (body) => {
        ctx.body = body
        resolve()
      }
      browserify({
        src: opts.src,
        transforms: opts.transforms
      })({ url: ctx.url }, { send }, next)
    }).then(() => next())
  })
}

module.exports = (opts) => {
  const app = new Koa()

  // Swap out reloaded server instance on server file change
  const getServer = () =>
    require(path.resolve(opts.relative, opts.server.main)).default
  let server = getServer()

  // Watch for file changes and swap out the hot-mounted server instance,
  // or re-eval the client-side bundle in the browser
  opts.server.watch.forEach((glob) => {
    chokidar.watch(opts.relative + '/' + glob).on('change', () => {
      forEach(require.cache, (v, k) => {
        if (!k.match('node_modules')) delete require.cache[k]
      })
      server = getServer()
      wss.broadcast('server')
    })
  })
  opts.client.watch.forEach((glob) => {
    chokidar.watch(opts.relative + '/' + glob).on('change', () => {
      wss.broadcast('client')
    })
  })

  // Mount hotloading middleware
  app.use((ctx, next) => {
    // Serve the client bundle
    if (ctx.url === '/client.js') {
      return bmiddleware({
        src: opts.relative,
        transforms: opts.client.transforms
      })(ctx, next)
    }
    // Mount server app and inject reloader and client-side bundle
    // script into head tag
    return mount(server)(ctx).then(() => {
      const $ = cheerio.load(ctx.body)
      if (!$('body').length) return
      $('body').append(`<script>${reloaderScript}</script>`)
      $('body').append('<script src="/client.js"></script>')
      ctx.body = $.html()
    })
  })
  return app
}
