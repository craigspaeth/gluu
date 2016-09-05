import { view as newview } from '../../../'
import { largeMargin, type } from './lib'
import { state, toggleModal } from '../controllers'

const view = newview()
const { div, h3 } = view.els()
const bg = (open) => ({
  background: 'rgba(0,0,0,0.7)',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: open ? 2 : -1,
  opacity: open ? 1 : 0,
  transition: 'opacity 0.2s'
})

view.styles({
  bg: bg(),
  bgopen: bg(true),
  inner: {
    background: 'white',
    width: `calc(100% - ${largeMargin * 2}px)`,
    height: `calc(100% - ${largeMargin * 2}px)`,
    position: 'absolute',
    top: largeMargin,
    left: largeMargin,
    padding: largeMargin
  },
  h3: type('avantgarde', 'largeHeadline')
})

view.render(() =>
  div((state.get('modalOpen') ? '.bgopen' : '.bg'), { onClick: toggleModal },
    div('.inner',
      h3('.h3', state.get('show').partner.name)))
)

export default view()
