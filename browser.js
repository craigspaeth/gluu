const Bluebird = require('bluebird')
const unikoa = require('unikoa')
const bootstrap = require('unikoa-bootstrap')
const render = require('unikoa-react-render')
const Lokka = require('lokka').Lokka
const Transport = require('lokka-transport-http').Transport
const tree = require('universal-tree')
const veact = require('veact')

// Vars
const isServer = typeof window === 'undefined'
const isBrowser = !isServer
const api = new Lokka({
  transport: new Transport('http://localhost:3000/api')
})

// Use Bluebird for promises
if (isServer) global.Promise = Bluebird
else window.Promise = Bluebird

// Routing
const router = () => {
  const router = unikoa()
  router.use(bootstrap)
  router.use((ctx, next) => {
    ctx.render = (body, state) => render({
      body: body,
      subscribe: (cb) => state.on('update', cb)
    })(ctx, next)
    return next()
  })
  return router
}

// Export stuff
module.exports = {
  api: api,
  tree: tree,
  router: router,
  isServer: isServer,
  isBrowser: isBrowser,
  view: veact
}
