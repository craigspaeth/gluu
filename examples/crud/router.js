import { router as newrouter } from '../../'
import { list, newTweet, show } from './controllers'

const router = newrouter()

router.get('/tweets', list)
router.get('/tweets/new', newTweet)
router.get('/tweets/:id', show)

export default router
