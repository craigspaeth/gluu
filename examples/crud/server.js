import { app, graphqlize } from '../../'
import * as models from './models'
import router from './router'

router.all('/api', graphqlize(models))

export default app(router)
