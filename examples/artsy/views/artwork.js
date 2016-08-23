import { view as newview } from '../../../'
import { type, graySemibold } from './lib'
import { assign } from 'lodash'

const view = newview()
const { div, img, p, em } = view.els()

view.styles({
  img: {
    width: '100%',
    marginBottom: '10px'
  },
  p: assign(
    type('garamond', 'largeCaption'),
    {
      color: graySemibold
    }
  ),
  em: {
    fontStyle: 'italic'
  }
})

view.render(({ artwork }) =>
  div(
    img('.img', { src: artwork.imageSrc }),
    p('.p', artwork.artistName),
    p('.p',
      em('.em', artwork.title),
      ', ',
      new Date(artwork.date).getYear()))
)

export default view()
