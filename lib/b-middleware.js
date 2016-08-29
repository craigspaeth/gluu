const c = require('koa-convert')
const browserify = require('browserify-dev-middleware')
const babelify = require('babelify')
const brfsBabel = require('brfs-babel')

module.exports = (opts) => {
  return c((ctx, next) => {
    return new Promise((resolve, reject) => {
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
        transforms: [brfsBabel, babelify].concat(opts.transforms || [])
      })({ url: ctx.url }, { send }, next)
    }).then(() => next())
  })
}
