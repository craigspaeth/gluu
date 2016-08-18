import './models'
import { app, router } from '../'
import * as controller from './controller'

router.get('/article/:id', controller.show)

export default app()
