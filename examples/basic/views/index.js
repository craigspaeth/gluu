import { view as newview } from '../../../'
import Header from './header'
import { state } from '../controllers'

const view = newview()
const { h2, div, header } = view.els({ header: Header })

view.render(() => {
  return div(
    header(),
    h2(state.get('article').title),
    h2(state.get('article').body),
    h2(state.get('article', 'author').name)
  )
})

export default view()
