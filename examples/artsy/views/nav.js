import { view as newview } from '../../../'
import { state } from '../controllers'
import { assign } from 'lodash'
import { type, smallMargin } from './lib'
import { join } from 'path'
import { readFileSync } from 'fs'

const view = newview()
const { nav, a } = view.els()
const logo = readFileSync(join(__dirname, 'logo.svg'), 'utf8')

view.styles({
  nav: assign(type('avantgarde', 'body'), {
    borderBottom: '1px solid #eee',
    padding: 10
  }),
  a: {
    position: 'absolute',
    right: smallMargin,
    top: smallMargin - 3
  }
})

view.render(() => {
  return nav('.nav',
    a({ dangerouslySetInnerHTML: { __html: logo } }),
    a('.a', state.get('user').name))
})

export default view()
