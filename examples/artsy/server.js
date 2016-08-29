import { app, graphqlize } from '../../'
import * as models from './models'
import router from './router'

router.all('/api', graphqlize(models))

const server = app(router)

export default server

if (require.main === module) server.listen(3000)
