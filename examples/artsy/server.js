import convert from 'koa-convert'
import graphqlHTTP from 'koa-graphql'
import Koa from 'koa'
import mongo from 'joiql-mongo'
import router from './router'
import * as models from './models'

const app = new Koa()
const api = mongo.models(...Object.values(models))
const graphql = convert(graphqlHTTP({ schema: api.schema, graphiql: true }))

router.all('/api', graphql)
app.use(router.routes())

export default app
