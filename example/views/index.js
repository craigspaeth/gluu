import veact from 'veact'
import Header from './header'
import { state } from '../controller'

const view = veact()
const { h1, h2, div, header } = view.els({ header: Header })

view.render(() => {
  return div(
    header(),
    h2(state.get('article').title),
    h2(state.get('article').body),
    h2(state.get('article', 'author').name)
  )
})

export default view()
