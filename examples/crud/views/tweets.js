import { view as newview } from '../../../'
import { state, deleteTweet } from '../controllers'
import Header from './header'

const view = newview()
const { ul, li, div, h1, a, header } = view.els({ header: Header })

view.render(() =>
  div(
    header(),
    h1('Tweets'),
    ul(
      state.get('tweets').map((tweet) =>
        li(
          a({ href: `/tweets/${tweet._id}` }, tweet.body),
          a({ onClick: () => deleteTweet(tweet._id) }, 'X')))))
)

export default view()
