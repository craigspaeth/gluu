import { graphqlize } from '../../'
import Koa from 'koa'
import browserify from '../../lib/b-middlewware'
import * as models from './models'
import router from './router'

const app = new Koa()

router.all('/api', graphqlize(models))
app.use(router.routes())
app.use(browserify({ src: __dirname }))

if (require.main === module) {
  app.listen(3000)
  console.log('Listening')
}

export default app
