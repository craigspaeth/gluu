import { string, objectid, model } from '../'

model('article', {
  _id: objectid(),
  title: string(),
  body: string()
})
