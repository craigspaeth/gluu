import { tree, api } from '../'

export const state = tree({
  article: null,
  articles: []
})

export const show = async (ctx, next) => {
  const { article, comments, author } = await ctx.bootstrap(async () => {
    const article = await api.query(`{
      article(_id: "${ctx.params.id}") { title body }
    }`)
    // const { comments, author } = await Promise.all(
    //   api.query(`{ comments(articleId: "${article._id}") { body } }`),
    //   api.query(`{ author(_id: "${article.authorId}") { name } }`)
    // )
    return { article, comments: [], author: {} }
  })
  console.log('set', article)
  state.set('article', article)
  ctx.render('index')
}
