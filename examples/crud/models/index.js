import { string, objectid, model, array } from '../../../'

export const tweet = model('tweet', {
  userId: objectid(),
  body: string().max(150)
})

export const user = model('user', {
  name: string(),
  tweetIds: array().items(objectid())
})
