import veact from 'veact'
import { state, toggleModal } from '../controllers'
import { assign } from 'lodash'
import { type, mediumMargin } from './lib'
import Follow from './follow'
import moment from 'moment'

const view = veact()
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
  right: assign({}, section, type('garamond', 'body'), {
    paddingLeft: (mediumMargin / 2)
  }),
  h2: assign(
    type('avantgarde', 'largeHeadline'),
    { top: '-4px', position: 'relative' }
  ),
  chevron: {
    border: '1px solid black',
    borderRadius: 10,
    padding: 0,
    width: 17,
    height: 17,
    textAlign: 'center',
    lineHeight: '15px',
    fontSize: '20px',
    fontWeight: 'bold',
    display: 'inline-block',
    marginRight: 7
  },
  map: {
    display: 'inline-block',
    marginLeft: '10px',
    cursor: 'pointer'
  }
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
      h2('.h2', show.get('partner').name, follow()),
      div(
        moment(show.get('startAt')).format('MMM Do YY'),
        '–',
        moment(show.get('endAt')).format('MMM Do YY'),
        div(show.get('address').city, ',', show.get('address').street,
          div('.map', { onClick: toggleModal },
            div('.chevron', '›'), 'Map')))))
})

export default view()
