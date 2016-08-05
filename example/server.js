import Koa from 'koa'
import graphqlHTTP from 'koa-graphql'
import router from './router'
import model from './model'

const app = new Koa()

router.get('/api', graphqlHTTP({
  schema: model.schema,
  graphiql: true
}))
app.use(router.routes())

app.listen(3000)
console.log('Listening')
