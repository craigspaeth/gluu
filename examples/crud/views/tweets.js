import { view as newview } from '../../../'
import { state, deleteTweet } from '../controllers'

const view = newview()
const { ul, li, div, h1, a } = view.els()

view.render(() =>
  div(
    a({ href: '/tweets/new' }, 'New tweet'),
    h1('Tweets'),
    ul(
      state.get('tweets').map((tweet) =>
        li(
          a({ href: `/tweets/${tweet._id}` }, tweet.body),
          a({ onClick: () => deleteTweet(tweet._id) }, 'X')))))
)

export default view()
