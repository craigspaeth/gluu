const Bluebird = require('bluebird')
const Koa = require('koa')
const path = require('path')
const unikoa = require('unikoa')
const bootstrap = require('unikoa-bootstrap')
const render = require('unikoa-react-render')
const Joi = require('joi')
const Lokka = require('lokka').Lokka
const Transport = require('lokka-transport-http').Transport
const tree = require('universal-tree')
const fs = require('fs')
const browserify = require('./lib/b-middleware')
const veact = require('veact')
const React = require('react')
const cssReset = require('./lib/reset.js')
const JoiQLMongo = require('joiql-mongo')
const convert = require('koa-convert')
const graphqlHTTP = require('koa-graphql')

// Vars
const $ = React.DOM
const appDir = path.dirname(module.parent.filename)
const appBase = path.parse(appDir).base
const isServer = typeof window === 'undefined'
const isBrowser = !isServer
const api = new Lokka({
  transport: new Transport('http://localhost:3000/api')
})
const reloaderClient = fs.readFileSync(
  path.resolve(__dirname, 'lib/reloader-client.js'),
  'utf8'
)

// Use Bluebird for promises
if (isServer) global.Promise = Bluebird
else window.Promise = Bluebird

// Routing
const router = () => {
  const router = unikoa()
  router.get('/reloader-client.js', (ctx) => { ctx.body = reloaderClient })
  router.use(bootstrap)
  router.use((ctx, next) => {
    ctx.render = (body) => {
      render({
        head: () => $.style({}, cssReset),
        body: body,
        scripts: [
          `/${appBase}/client.js`,
          '/gluu-socket-io/socket.io.js',
          '/reloader-client.js'
        ]
      })(ctx, next)
    }
    return next()
  })
  return router
}

// Init app with routing and browserify middleware
const app = (router) => {
  const app = new Koa()
  app.use(router.routes())
  app.use(browserify({ src: path.resolve(appDir, '../') }))
  return app
}

// Wrap JoiQL Mongo models into Koa GraphQL middleware
const graphqlize = (models) => {
  JoiQLMongo.connect('mongodb://localhost:27017/gluu')
  const schema = JoiQLMongo.models(...Object.values(models)).schema
  return convert(graphqlHTTP({ schema, graphiql: true }))
}

// Export stuff
module.exports = {
  app: app,
  api: api,
  tree: tree,
  router: router,
  objectid: JoiQLMongo.objectid,
  object: Joi.object,
  string: Joi.string,
  number: Joi.number,
  array: Joi.array,
  boolean: Joi.boolean,
  date: Joi.date,
  model: JoiQLMongo.model,
  query: JoiQLMongo.query,
  mutation: JoiQLMongo.mutation,
  graphqlize: graphqlize,
  isServer: isServer,
  isBrowser: isBrowser,
  view: veact
}
