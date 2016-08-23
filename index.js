const Bluebird = require('bluebird')
const Koa = require('koa')
const graphqlHTTP = require('koa-graphql')
const convert = require('koa-convert')
const path = require('path')
const unikoa = require('unikoa')
const bootstrap = require('unikoa-bootstrap')
const render = require('unikoa-react-render')
const Joi = require('joi')
const joiql = require('joiql')
const mongo = require('promised-mongo')
const pluralize = require('pluralize')
const Lokka = require('lokka').Lokka
const Transport = require('lokka-transport-http').Transport
const tree = require('universal-tree')
const fs = require('fs')
const browserify = require('./lib/b-middleware')
const veact = require('veact')
const { capitalize } = require('lodash')
const React = require('react')
const cssReset = require('./lib/reset.js')

// Vars
const $ = React.DOM
const appDir = path.dirname(module.parent.filename)
const appBase = path.parse(appDir).base
const isServer = typeof window === 'undefined'
const isBrowser = !isServer
const objectid = Joi.extend({
  base: Joi.string(),
  name: 'string',
  pre: (val, state, options) => {
    if (options.convert) return mongo.ObjectId(val)
    else return val
  }
}).string
const db = mongo('mongodb://localhost:27017/gluu', ['articles'])
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

// Init app with routing and middleware
const app = (router) => {
  const app = new Koa()
  app.use(router.routes())
  app.use(browserify({ src: path.resolve(appDir, '../') }))
  return app
}

// Model JoiQL wrapper
const model = (name, _attrs) => {
  const joiqlHash = { query: {}, mutation: {} }
  const middlewares = []
  const attrs = Object.assign({ _id: objectid() }, _attrs)
  const plural = pluralize(name)
  const del = `delete${capitalize(name)}`
  joiqlHash.query[name] = Joi
    .object(attrs)
    .meta({ args: attrs })
  joiqlHash.query[plural] = Joi
    .array()
    .items(Joi.object(attrs))
    .meta({ args: attrs })
  joiqlHash.mutation[name] = Joi
    .object(attrs)
    .meta({ args: attrs })
  joiqlHash.mutation[del] = Joi
    .object(attrs)
    .meta({ args: attrs })
  middlewares.push([`query.${name}`, ({ req, res }) => {
    return db[plural].findOne({ _id: req.args._id })
      .then((doc) => { res[name] = doc })
  }])
  middlewares.push([`query.${plural}`, ({ req, res }) =>
    db[plural].find(req.args).then((docs) => { res[plural] = docs })
  ])
  middlewares.push([`mutation.${name}`, ({ req, res }) =>
    db[plural].save(req.args).then((doc) => { res[name] = doc })
  ])
  middlewares.push([`mutation.${del}`, ({ req, res }) =>
    db[plural].remove(req.args, { justOne: true })
  ])
  return {
    pre: () => console.log('add to middlewares'),
    post: () => console.log('add to middlewares'),
    joiqlHash: joiqlHash,
    middlewares: middlewares
  }
}

// Convert a bunch of models into GraphQL middleware
const models = (models) => {
  const middlewares = []
  const joiqlHash = { query: {}, mutation: {} }
  Object.values(models).forEach((model) => {
    Object.assign(joiqlHash.query, model.joiqlHash.query)
    Object.assign(joiqlHash.mutation, model.joiqlHash.mutation)
    middlewares.push(...model.middlewares)
  })
  const graphQLAPI = joiql(joiqlHash)
  middlewares.forEach(([route, middleware]) => graphQLAPI.on(route, middleware))
  return convert(graphqlHTTP({
    schema: graphQLAPI.schema,
    graphiql: true
  }))
}

// Export stuff
module.exports = {
  app: app,
  api: api,
  tree: tree,
  router: router,
  objectid: objectid,
  object: Joi.object,
  string: Joi.string,
  number: Joi.number,
  array: Joi.array,
  boolean: Joi.boolean,
  date: Joi.date,
  model: model,
  models: models,
  isServer: isServer,
  isBrowser: isBrowser,
  view: veact
}
