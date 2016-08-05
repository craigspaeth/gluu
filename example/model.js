import joiObjectId from 'joi-objectid'
import Joi, { object, string } from 'joi'
import joiql from 'joiql'
import mongo from 'promised-mongo'

const objectid = joiObjectId(Joi)
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
    article: object(articleAttrs).meta({ args: articleAttrs })
  }
})

api.on('query.articles', ({ req }) => db.articles.find())
api.on('mutation.article', ({ req }) => db.articles.save(req.args))

export default api
