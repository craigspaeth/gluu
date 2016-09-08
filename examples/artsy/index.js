require('babel-core/register')
const { connect } = require('joiql-mongo')
const hotglue = require('../../lib/hotglue')
const babelify = require('babelify')
const brfsBabel = require('brfs-babel')

const app = hotglue({
  relative: __dirname,
  server: {
    main: 'server.js',
    watch: [
      'models/**/*',
      'server.js'
    ]
  },
  client: {
    main: 'client.js',
    transforms: [brfsBabel, babelify],
    watch: [
      'views/**/*',
      'controllers/**/*',
      'router.js'
    ]
  }
})

if (require.main === module) {
  connect('mongodb://localhost:27017/gluu')
  app.listen(3000)
  console.log('Listening')
}
