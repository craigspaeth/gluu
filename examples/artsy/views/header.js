import { view as newview } from '../../../'
import { state, followShowPartner } from '../controllers'
import { assign } from 'lodash'
import { type, mediumMargin } from './lib'

const view = newview()
const { h1, p, div, ul, h2, header, button } = view.els()

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
    { paddingTop: '13px' }
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
      h2('.h2', show.get('partner').name),
      button({ onClick: followShowPartner }, 'Follow')))
})

export default view()
