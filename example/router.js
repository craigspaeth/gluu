import unikoa from 'unikoa'
import render from 'unikoa-react-render'
import bootstrap from 'unikoa-bootstrap'
import * as controller from './controller'
import Body from './view'
import React from 'react'

const $ = React.DOM
const router = unikoa()

// router.use(bootstrap)
// router.get('/article/:id', controller.show)

router.get('/', (ctx, next) => {
  console.log('moo')
  next()
})
router.use(render({
  body: Body,
  scripts: []
}))

export default router
