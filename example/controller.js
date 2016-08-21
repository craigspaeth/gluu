import { tree, api } from '../'

export const state = tree({
  article: null,
  articles: []
})

export const show = async (ctx, id, next) => {
  const article = await ctx.bootstrap(() => api.query(`{
    article(_id: "${id}") { title body }
  }`))
  state.set('article', article)
  ctx.render('index')
}
