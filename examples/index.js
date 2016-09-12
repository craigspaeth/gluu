const { connect } = require('joiql-mongo')
const Koa = require('koa')
const mount = require('koa-mount')
const artsy = require('./artsy')
const bare = require('./bare')
const crud = require('./crud')

const app = new Koa()

// Mount apps
app.use(mount('/shows', artsy))
app.use(mount('/tweets', crud))
app.use(mount('/articles', bare))

// Connect & Listen
connect('mongodb://localhost:27017/gluu')
app.listen(3000)
console.log('Listening')
