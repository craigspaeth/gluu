import veact from 'veact'
const view = veact()
const { h1, img, div } = view.els()
const src = 'https://upload.wikimedia.org/wikipedia/commons/3/37/Wikipedia-lolcat.jpg'

view.render(() => {
  return div(
    h1('Articlez:'),
    img({ src: src })
  )
})

export default view()
