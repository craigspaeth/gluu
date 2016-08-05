import objectid from 'joi-objectid'
import { object, string } from 'joi'
import joiql from 'joiql'
import mongo from 'promised-mongo'

const db = mongo('mongodb://localhost:27017/gluu', ['articles'])

const articleAttrs = {
  id: objectid().required(),
  title: string(),
  body: string()
}

const api = joiql({
  query: {
    articles: object(articleAttrs)
  },
  mutation: {
    article: object(articleAttrs).meta({ args: object(articleAttrs) })
  }
})

api.on('query.articles', ({ req }) => db.articles.find())
api.on('mutation.article', ({ req }) => db.articles.save(req.args))

export default api
