import { string, objectid, model } from '../'

model('article', {
  _id: objectid(),
  title: string(),
  body: string()
})

// model('comment', {
//   _id: objectid(),
//   articleId: objectid(),
//   body: string()
// })

// model('author', {
//   _id: objectid(),
//   name: string()
// })