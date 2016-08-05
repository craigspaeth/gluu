import tree from 'universal-tree'
import { Lokka } from 'lokka'
import { Transport } from 'lokka-transport-http'

const api = new Lokka({
  transport: new Transport('http://localhost:3000/api')
})

export const state = tree({
  articles: []
})

export const show = async (ctx, next) => {
  const articles = await ctx.bootstrap(() =>
    api.query(`{ article(id: ${ctx.params.id}) { title } }`)
  )
  state.set('articles', articles)
}
