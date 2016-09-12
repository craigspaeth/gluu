import Lokka from 'lokka'
import Transport from 'lokka-transport-http'
import tree from 'universal-tree'
import indexView from '../views'

const api = new Lokka({
  transport: new Transport('http://localhost:3000/articles/api')
})

export const state = tree({
  article: {}
})

export const index = async (ctx) => {
  const { article } = await ctx.bootstrap(() =>
    api.query('{ article { title body } }')
  )
  state.set('article', article)
  ctx.render({ body: indexView })
}
