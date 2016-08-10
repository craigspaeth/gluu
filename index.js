const Bluebird = require('bluebird')
const Koa = require('koa')
const graphqlHTTP = require('koa-graphql')
const convert = require('koa-convert')
const browserify = require('./b-middleware')
const path = require('path')
const unikoa = require('unikoa')
const bootstrap = require('unikoa-bootstrap')
const render = require('unikoa-react-render')
const Joi = require('joi')
const joiql = require('joiql')
const mongojs = require('mongojs')
const _ = require('lodash')
const pluralize = require('pluralize')

const appDir = path.dirname(module.parent.filename)
const appBase = path.parse(appDir).base
const isServer = typeof window === 'undefined'
const joiqlHash = { query: {}, mutation: {} }

const objectid = require('joi-objectid')(Joi)
const db = mongojs('mongodb://localhost:27017/gluu', ['articles'])
const app = new Koa()
const router = unikoa()

// Use Bluebird for promises
if (isServer) global.Promise = Bluebird
else window.Promise = Bluebird

// Routing
router.use(bootstrap)
router.use((ctx, next) => {
  ctx.render = (viewName) => {
    const body = require(path.resolve(appBase, 'views', viewName + '.js')).default
    render({
      head: () => '',
      body: body,
      scripts: [`${appBase}/client.js`]
    })(ctx, next)
  }
  return next()
})

// Middleware
const api = joiql(joiqlHash)
api.on('query mutation', async ({ req }) => {
  _.each(req, (field) => { field.args._id = mongojs.ObjectId(field.args._id) })
})
router.all('/api', convert(graphqlHTTP({
  schema: api.schema,
  graphiql: true
})))
app.use(router.routes()).use(router.allowedMethods())
app.use(browserify(
  { src: path.resolve(appDir, '../') }
))

// Model JoiQL wrapper
const model = (name, attrs) => {
  const plural = pluralize(name)
  joiqlHash.query[name] = Joi.object(attrs).meta({ args: attrs })
  joiqlHash.query[name] = Joi.array().items(Joi.object(attrs))
  joiqlHash.mutation[name] = Joi.object(attrs).meta({ args: attrs })
  api.on(`query.${name}`, ({ req, res }) => {
    db[plural].findOne({ _id: req.args._id }).then((doc) => { res[name] = doc })
  })
  api.on(`query.${plural}`, ({ req, res }) => {
    db[plural].find().then((docs) => { res[plural] = docs })
  })
  api.on(`mutation.${name}`, ({ req, res }) => {
    db.articles.save(req.args).then((doc) => { res[name] = doc })
  })
  return {
    pre: () => console.log('add to middleware'),
    post: () => console.log('add to middleware')
  }
}

// Export stuff
module.exports = {
  app: app,
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
