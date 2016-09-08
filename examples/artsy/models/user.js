import { string, objectid, model, object, array } from 'joiql-mongo'

export default model('user', {
  name: string().meta((is) => ({
    create: is.required()
  })),
  email: string().email().meta((is) => ({
    create: is.required()
  })),
  following: array().items(object({
    model: string().valid('artwork', 'show'),
    id: objectid()
  }).meta({ name: 'Follow' }))
})
