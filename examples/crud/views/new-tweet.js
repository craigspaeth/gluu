import veact from 'veact'
import { createTweet, updateTweet } from '../controllers'
import { gutterSize, type } from './lib'
import Header from './header'

const view = veact()
const { div, h1, input, button, form, header } = view.els({ header: Header })

view.on('componentDidMount', ({ refs }) => {
  refs.input.focus()
})

view.styles({
  container: Object.assign(type('sans'), {
    padding: gutterSize
  }),
  h1: {
    marginBottom: gutterSize
  },
  input: Object.assign(type('sans'), {
    padding: '5px',
    border: '1px solid #ccc',
    outline: 'none'
  }),
  btn: Object.assign(type('sansUpper'), {
    marginLeft: '10px',
    background: 'black',
    color: 'white',
    border: 'none',
    padding: '7px 20px'
  })
})

view.render(() =>
  div(
    header(),
    div('.container',
      h1('.h1', 'New Tweet'),
      form({ onSubmit: createTweet },
        input('.input', { onChange: updateTweet, ref: 'input' }),
        button('.btn', 'Send'))))
)

export default view()
