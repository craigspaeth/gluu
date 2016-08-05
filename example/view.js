import veact from 'veact'
import { state } from './controller'

const view = veact()
const { ul, li } = view.els()

veact.render(() => {
  ul(
    state.get('articles').map((article) =>
      li(article.title)))
})

export default view()
