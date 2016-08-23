import { view as newview } from '../../../'

const view = newview()
const { header, a } = view.els()

view.styles({
  a: {
    padding: '10px'
  }
})

view.render(() =>
  header(
    a('.a', { href: '/' }, 'Home'),
    a('.a', { href: '/tweets' }, 'Tweets'),
    a('.a', { href: '/tweets/new' }, 'New Tweet'))
)

export default view()
