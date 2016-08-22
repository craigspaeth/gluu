import { view as newview } from '../../../'
import { createTweet, updateTweet } from '../controllers'

const view = newview()
const { div, h1, input, button, form } = view.els()

view.on('componentDidMount', ({ refs }) => {
  refs.input.focus()
})

view.render(() =>
  div(
    h1('New Tweet'),
    form({ onSubmit: createTweet },
      input({ onChange: updateTweet, ref: 'input' }),
      button('Submit')))
)

export default view()
