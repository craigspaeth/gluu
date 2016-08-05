import joiObjectId from 'joi-objectid'
import Joi, { object, string, array } from 'joi'
import joiql from 'joiql'
import mongo from 'promised-mongo'

const objectid = joiObjectId(Joi)
const db = mongo('mongodb://localhost:27017/gluu', ['articles'])

const articleAttrs = {
  _id: objectid(),
  title: string(),
  body: string()
}

const api = joiql({
  query: {
    articles: array().items(object(articleAttrs))
  },
  mutation: {
    article: object(articleAttrs).meta({ args: articleAttrs })
  }
})

api.on('query.articles', async ({ req, res }) => {
  res.articles = await db.articles.find()
})
api.on('mutation.article', async ({ req, res }) => {
  res.article = await db.articles.save(req.args)
})

export default api
