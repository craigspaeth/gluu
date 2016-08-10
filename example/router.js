import { router } from '../'
import controller from './controller'

router.get('/article/:id', controller.show)
