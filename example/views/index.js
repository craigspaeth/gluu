import veact from 'veact'
import { state } from '../controller'

const view = veact()
const { h1, h2, div } = view.els()

view.render(() => {
  return div(
    h1('Articlez:'),
    h2(state.get('article').title),
    h2(state.get('article').body),
    h2(state.get('article', 'author').name)
  )
})

export default view()
