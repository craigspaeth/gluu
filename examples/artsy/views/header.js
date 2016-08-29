import { view as newview } from '../../../'
import { state } from '../controllers'
import { assign } from 'lodash'
import { type, mediumMargin } from './lib'
import Follow from './follow'

const view = newview()
const { h1, p, div, ul, h2, header, follow } = view.els({ follow: Follow })

const section = {
  width: '50%',
  display: 'inline-block',
  verticalAlign: 'top'
}

view.styles({
  h1: assign(
    type('garamond', 'largeHeadline'),
    {
      fontWeight: 'normal',
      marginBottom: mediumMargin
    }
  ),
  p: type('garamond'),
  left: assign({}, section, {
    paddingRight: (mediumMargin / 2)
  }),
  right: assign({}, section, {
    paddingLeft: (mediumMargin / 2)
  }),
  h2: assign(
    type('avantgarde', 'largeHeadline'),
    { top: '-4px', position: 'relative' }
  )
})

view.render(() => {
  const show = state.select('show')
  return header(
    div('.left',
      h1('.h1', show.get('name')),
      p('.p', show.get('description')),
      show.get('artworks') &&
        ul(
            show.get('artworks').map((artwork) =>
              artwork.title))),
    div('.right',
      h2('.h2', show.get('partner').name, follow())))
})

export default view()
