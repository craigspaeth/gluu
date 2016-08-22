import { view as newview } from '../../../'

const view = newview()
const { h1, div } = view.els()

view.render(() => {
  return div(
    h1('Article:')
  )
})

export default view()
