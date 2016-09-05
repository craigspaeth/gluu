import { string, objectid, model, array } from '../../../'

export const tweet = model('tweet', {
  userId: objectid(),
  body: string().max(150)
})

tweet.on('create', async (ctx, next) => {
  await next()
  console.log('congrats on the first tweet')
})

export const user = model('user', {
  name: string(),
  tweetIds: array().items(objectid())
})
