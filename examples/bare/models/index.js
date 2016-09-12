import { string, model } from 'joiql-mongo'

export default model('article', {
  title: string().meta((is) => ({
    'create': is.required().min(50).max(200)
  })),
  body: string()
})
