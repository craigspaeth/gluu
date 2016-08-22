import { app, models } from '../../'
import * as m from './models'
import router from './router'

router.all('/api', models(m))

export default app(router)
