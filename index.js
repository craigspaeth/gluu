const Bluebird = require('bluebird')
const Koa = require('koa')
const graphqlHTTP = require('koa-graphql')
const convert = require('koa-convert')
const browserify = require('./lib/b-middleware')
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

const appDir = path.dirname(module.parent.filename)
const appBase = path.parse(appDir).base
const isServer = typeof window === 'undefined'
const joiqlHash = { query: {}, mutation: {} }
const middlewares = []

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

// Use Bluebird for promises
if (isServer) global.Promise = Bluebird
else window.Promise = Bluebird

// Routing
const router = () => {
  const router = unikoa()
  router.use(bootstrap)
  router.use((ctx, next) => {
    ctx.render = (viewName) => {
      const body = require(path.resolve(
        appBase,
        'views', viewName + '.js'
      )).default
      render({
        head: () => '',
        body: body,
        scripts: [`${appBase}/client.js`]
      })(ctx, next)
    }
    return next()
  })
  return router
}

// Init app with routing and middleware
const app = (router) => {
  const app = new Koa()
  const graphQLAPI = joiql(joiqlHash)
  middlewares.forEach(([route, middleware]) => graphQLAPI.on(route, middleware))
  router.all('/api', convert(graphqlHTTP({
    schema: graphQLAPI.schema,
    graphiql: true
  })))
  app.use(router.routes())
  app.use(browserify({ src: path.resolve(appDir, '../') }))
  return app
}

// Model JoiQL wrapper
const model = (name, attrs) => {
  const plural = pluralize(name)
  joiqlHash.query[name] = Joi
    .object(attrs)
    .meta({ args: attrs })
  joiqlHash.query[plural] = Joi.array()
    .items(Joi.object(attrs))
    .meta({ args: attrs })
  joiqlHash.mutation[name] = Joi.object(attrs)
    .meta({ args: attrs })
  middlewares.push([`query.${name}`, ({ req, res }) => {
    return db[plural].findOne({ _id: req.args._id })
      .then((doc) => { res[name] = doc })
  }])
  middlewares.push([`query.${plural}`, ({ req, res }) =>
    db[plural].find(req.args).then((docs) => { res[plural] = docs })
  ])
  middlewares.push([`mutation.${name}`, ({ req, res }) =>
    db.articles.save(req.args).then((doc) => { res[name] = doc })
  ])
  return {
    pre: () => console.log('add to middlewares'),
    post: () => console.log('add to middlewares')
  }
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
  model: model
}
