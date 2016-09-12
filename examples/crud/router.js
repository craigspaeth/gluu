import unikoa from 'unikoa'
import bootstrap from 'unikoa-bootstrap'
import render from 'unikoa-react-render'
import { state, list, newTweet, show } from './controllers'
import Head from './views/head'

const router = unikoa()

router.use(bootstrap)
router.use(render({
  head: Head,
  subscribe: (cb) => state.on('update', cb)
}))
router.get('/', list)
router.get('/new', newTweet)
router.get('/:id', show)

export default router
