import bluebird from 'bluebird'
global.Promise = bluebird

import Koa from 'koa'
import graphqlHTTP from 'koa-graphql'
import convert from 'koa-convert'
import model from './model'
import router from './router'

const app = new Koa()

router.all('/api', convert(graphqlHTTP({
  schema: model.schema,
  graphiql: true
})))
app.use(router.routes()).use(router.allowedMethods())
app.listen(3000)
console.log('Listening')
