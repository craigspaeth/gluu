import veact from 'veact'
import { state, deleteTweet } from '../controllers'
import Header from './header'
import { type, gutterSize } from './lib'

const view = veact()
const { ul, li, div, a, header } = view.els({ header: Header })

view.render(() =>
  div(
    header(),
    ul(
      state.get('tweets').length
      ? state.get('tweets').map((tweet, i) =>
        li('.li', { key: i },
          a('.a', { href: `/tweets/${tweet._id}` }, tweet.body),
          a('.del', { onClick: () => deleteTweet(tweet._id) }, '×')))
      : div('.empty', 'You have no tweets!')))
)

view.styles({
  li: Object.assign(type('sans'), {
    padding: gutterSize,
    borderBottom: '1px solid #eee',
    position: 'relative'
  }),
  del: {
    fontFamily: 'Helvetica',
    marginLeft: '10px',
    fontSize: '24px',
    cursor: 'pointer',
    position: 'absolute',
    right: 20,
    top: 12,
    color: '#aaa'
  },
  a: {
    textDecoration: 'none',
    color: 'black'
  },
  empty: Object.assign(type('sans'), {
    padding: gutterSize
  })
})

export default view()
