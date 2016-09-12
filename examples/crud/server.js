import Koa from 'koa'
import router from './router'
import graphqlize from '../../lib/graphqlize'
import * as models from './models'

const app = new Koa()

router.all('/api', graphqlize(models))
app.use(router.routes())

export default app
