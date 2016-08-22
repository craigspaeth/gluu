import { router as newrouter } from '../../'
import * as controller from './controllers'

const router = newrouter()

router.get('/tweets', controller.list)
router.get('/tweets/new', controller.newTweet)
router.get('/tweets/:id', controller.show)

export default router
