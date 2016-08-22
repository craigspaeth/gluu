import { view as newview } from '../../../'
import { createTweet, updateTweet } from '../controllers'

const view = newview()
const { div, h1, input, button, form } = view.els()

view.render(() => {
  return div(
    h1('New Tweet'),
    form({ onSubmit: createTweet },
      input({ onChange: updateTweet }),
      button('Submit')))
})

export default view()
