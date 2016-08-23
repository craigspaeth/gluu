import { router as newrouter } from '../../'
import { show } from './controllers'

const router = newrouter()

router.get('/show/:id', show)

export default router
