import { tree, api } from '../../../'
import tweetsView from '../views/tweets'
import tweetView from '../views/tweet'
import newTweetView from '../views/new-tweet'
import { reject } from 'lodash'

export const state = tree({
  tweets: [],
  tweet: null,
  user: null,
  body: ''
})

export const list = async (ctx) => {
  const { tweets } = await ctx.bootstrap(() =>
    api.query('{ tweets { body _id } }')
  )
  state.set('tweets', tweets)
  ctx.render(tweetsView, state)
}

export const show = async (ctx) => {
  const { tweet, user } = await ctx.bootstrap(async () => {
    const { tweet } = await api.query(`{
      tweet(_id: "${ctx.params.id}") { body userId }
    }`)
    const { user } = await api.query(`{
      user(_id: "${tweet.userId}") { name }
    }`)
    return { tweet, user }
  })
  state.set('tweet', tweet)
  state.set('user', user)
  ctx.render(tweetView, state)
}

export const newTweet = async (ctx) => {
  ctx.render(newTweetView, state)
}

export const updateTweet = (e) => {
  state.set('body', e.target.value)
}

export const deleteTweet = async (id) => {
  if (!window.confirm('Are you sure?')) return
  await api.mutate(`{ tweet: deleteTweet(_id: "${id}") { body } }`)
  state.set('tweets', reject(state.get('tweets'), { _id: id }))
}

export const createTweet = async (e) => {
  e.preventDefault()
  const { users } = await api.query('{ users { _id } }')
  await api.mutate(`{
    tweet: createTweet(
      body: "${state.get('body')}"
      userId: "${users[0]._id}"
    ) {
      body
    }
  }`)
  window.location.assign('/tweets')
}
