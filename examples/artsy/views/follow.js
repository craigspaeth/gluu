import veact from 'veact'
import { join } from 'path'
import { readFileSync } from 'fs'
import { state, toggleFollow } from '../controllers'
import { find, assign, uniqueId } from 'lodash'
import { type, purpleRegular } from './lib'

const view = veact()
const { div, style } = view.els()
const plus = readFileSync(join(__dirname, 'plus.svg'), 'utf8')

const label = (highlighted) =>
  assign(type('garamond', 'body'), {
    display: 'inline',
    background: 'transparent',
    border: 0,
    padding: 0,
    outline: 'none',
    textTransform: 'capitalize',
    letterSpacing: 0,
    color: highlighted ? purpleRegular : 'black'
  })

view.styles({
  label: label(),
  highlighted: label(true),
  plus: {
    display: 'inline',
    position: 'relative',
    top: 10,
    left: 5
  },
  container: {
    display: 'inline',
    cursor: 'pointer'
  }
})

view.render(() => {
  const id = state.get('show')._id
  const following = find(state.get('user').following, { id })
  const uid = `icon-${uniqueId()}`
  const css = `.${uid} * { fill: ${purpleRegular} }`
  return div('.container', { onClick: () => toggleFollow('show', id) },
      (following ? style({ dangerouslySetInnerHTML: { __html: css } }) : ''),
      div('.plus', {
        dangerouslySetInnerHTML: { __html: plus },
        className: uid
      }),
      div(
        following ? '.highlighted' : '.label',
        following ? 'Following' : 'Follow'))
})

export default view()
