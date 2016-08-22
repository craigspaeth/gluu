import { router as newrouter } from '../../'
import * as controller from './controllers'

const router = newrouter()

router.get('/article/:id', controller.show)

export default router
