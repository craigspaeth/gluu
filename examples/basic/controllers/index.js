import { tree, api } from '../../../'
import index from '../views'

export const state = tree({
  article: null,
  articles: []
})

export const show = async (ctx, id, next) => {
  const { article, author } = await ctx.bootstrap(async () => {
    const { article } = await api.query(`{
      article(_id: "${ctx.params.id}") { title body authorId }
    }`)
    const { author } = await api.query(`{
      author(_id: "${article.authorId}") { name }
    }`)
    return { article, author }
  })
  state.set('article', article)
  state.select('article').set('author', author)
  ctx.render(index)
}
