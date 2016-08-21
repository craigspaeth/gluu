import * as m from './models'
import { app, models } from '../'
import router from './router'

router.all('/api', models(m))
const server = app(router)

export default server
