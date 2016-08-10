import { app, router } from '../'
import * as controller from './controller'

router.get('/article/:id', controller.show)
app.listen(3000)
console.log('Listening')
