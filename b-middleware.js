const c = require('koa-convert')
const browserify = require('browserify-dev-middleware')
const babelify = require('babelify')

module.exports = (opts) => {
  return c(async (ctx, next) => {
    await new Promise((resolve, reject) => {
      const next = (err) => {
        if (err) reject(err)
        else resolve()
      }
      const send = (body) => {
        ctx.body = body
        resolve()
      }
      browserify({
        src: opts.src,
        transforms: [babelify].concat(opts.transforms || [])
      })({ url: ctx.url }, { send }, next)
    })
    await next()
  })
}
