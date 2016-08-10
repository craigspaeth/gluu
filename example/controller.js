import tree from 'universal-tree'
import { Lokka } from 'lokka'
import { Transport } from 'lokka-transport-http'

const api = new Lokka({
  transport: new Transport('http://localhost:3000/api')
})

export const state = tree({
  article: null,
  articles: []
})

export const show = async (ctx, next) => {
  const { article } = await ctx.bootstrap(() =>
    api.query(`{ article(_id: "${ctx.params.id}") { title body } }`)
  )
  state.set('article', article)
  ctx.render('index')
}
