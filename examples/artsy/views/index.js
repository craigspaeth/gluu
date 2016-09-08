import veact from 'veact'
import { mediumMargin, largeMargin } from './lib'
import Header from './header'
import Artwork from './artwork'
import Nav from './nav'
import Modal from './modal'
import { state } from '../controllers'

const view = veact()
const { div, header, ul, li, artworkitem, nav, modal } = view.els({
  header: Header,
  artworkitem: Artwork,
  nav: Nav,
  modal: Modal
})

view.styles({
  container: {
    padding: largeMargin
  },
  li: {
    width: '25%',
    display: 'inline-block',
    verticalAlign: 'top',
    paddingRight: mediumMargin
  },
  ul: {
    marginTop: largeMargin
  }
})

view.render(() => {
  return div(
    nav(),
    div('.container',
      modal(),
      header(),
      ul('.ul',
        state.select('show').get('artworks').map((artwork) =>
          li('.li', artworkitem({ artwork }))))))
})

export default view()
