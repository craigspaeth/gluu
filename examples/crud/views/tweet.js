import veact from 'veact'
import { state } from '../controllers'
import Header from './header'

const view = veact()
const { h2, div, h1, a, header } = view.els({ header: Header })

view.render(() =>
  div(
    header(),
    h1(state.get('tweet').body),
    h2(`By ${state.get('user').name}`))
)

export default view()
