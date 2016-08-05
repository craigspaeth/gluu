import unikoa from 'unikoa'
import render from 'unikoa-react-render'
import bootstrap from 'unikoa-bootstrap'
import * as controller from './controller'
import Body from './view'

const router = unikoa()

router.use(bootstrap)
router.get('/article/:id', controller.show)
router.use(render({
  body: Body,
  scripts: ['foo']
}))

export default router
