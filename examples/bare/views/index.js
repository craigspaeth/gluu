import veact from 'veact'
import { state } from '../controllers'

const view = veact()

const { div, h1 } = view.els()

view.render(() =>
  div(
    h1(state.get('article').title),
    div(state.get('article').body))
)

export default view()
