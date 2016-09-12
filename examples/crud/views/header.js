import veact from 'veact'
import { type, gutterSize } from './lib'

const view = veact()
const { header, a } = view.els()

view.render(() =>
  header('.header',
    a('.a', { href: '/' }, 'Home'),
    a('.a', { href: '/tweets/new' }, 'New Tweet'))
)

view.styles({
  header: Object.assign(type('sansUpper'), {
    padding: gutterSize,
    borderBottom: '1px solid #eee'
  }),
  a: {
    textDecoration: 'none',
    marginRight: '20px',
    color: 'black'
  }
})

export default view()
