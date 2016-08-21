import { string, objectid, model } from '../'

export const article = model('article', {
  authorId: objectid(),
  title: string(),
  body: string()
})

export const author = model('author', {
  name: string()
})
