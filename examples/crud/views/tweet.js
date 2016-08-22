import { view as newview } from '../../../'
import { state } from '../controllers'

const view = newview()
const { h2, div, h1, a } = view.els()

view.render(() => {
  return div(
    a({ href: '/tweets' }, 'All tweets'),
    h1(state.get('tweet').body),
    h2(`By ${state.get('user').name}`))
})

export default view()
