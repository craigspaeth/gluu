import { state, toggleFollow } from '../controllers'
import { view as newview } from '../../../'
import { type, graySemibold, purpleRegular } from './lib'
import { assign, find } from 'lodash'

const view = newview()
const { div, img, p, em } = view.els()

const heart = (highlighted) =>
  ({
    padding: 10,
    background: highlighted ? 'black' : purpleRegular,
    width: 40,
    height: 40,
    lineHeight: '23px',
    textAlign: 'center',
    borderRadius: 20,
    color: 'white',
    position: 'absolute',
    right: 5,
    bottom: 15,
    cursor: 'pointer'
  })

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
  },
  imgcontainer: {
    position: 'relative'
  },
  heart: heart(),
  hearted: heart(true)
})

view.render(({ artwork }) => {
  const following = find(
    state.get('user').following,
    { id: artwork._id }
  )
  return div(
    div('.imgcontainer',
      div(
        (following ? '.hearted' : '.heart'),
        { onClick: () => toggleFollow('artwork', artwork._id) },
        '♡'
      ),
      img('.img', { src: artwork.imageSrc })),
    p('.p', artwork.artistName),
    p('.p',
      em('.em', artwork.title),
      ', ',
      new Date(artwork.date).getYear()))
})

export default view()
