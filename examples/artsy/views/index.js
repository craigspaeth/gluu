import { view as newview } from '../../../'
import { mediumMargin,largeMargin } from './lib'
import Header from './header'
import Artwork from './artwork'
import { state } from '../controllers'

const view = newview()
const { div, header, ul, li, artworkitem } = view.els({
  header: Header,
  artworkitem: Artwork
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
  return div('.container',
    header(),
    ul('.ul',
      state.select('show').get('artworks').map((artwork) =>
        li('.li', artworkitem({ artwork })))))
})

export default view()
