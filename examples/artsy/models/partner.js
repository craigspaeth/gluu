import { string, model } from 'joiql-mongo'

export default model('partner', {
  name: string()
})
