import { tree, api } from '../../../'
import showView from '../views/index'

export const state = tree({
  show: {}
})

export const show = async (ctx) => {
  const { show, artworks, partner } = await ctx.bootstrap(async () => {
    const { show } = await api.query(`{ show(_id: "${ctx.params.id}") {
      name description artworkIds partnerId
    } }`)
    const { a, b, partner } = await api.query(`{
      a: artwork(_id: "${show.artworkIds[0]}") {
        title artistName date imageSrc
      }
      b: artwork(_id: "${show.artworkIds[1]}") {
        title artistName date imageSrc
      }
      partner(_id: "${show.partnerId}") {
        name
      }
    }`)
    return { show, artworks: [a, b], partner }
  })
  state.set('show', show)
  state.select('show').set('artworks', artworks)
  state.select('show').set('partner', partner)
  ctx.render(showView, state)
}

export const followShowPartner = async (ctx) => {
  window.alert(`Follow partner ${state.get('show').partner.name}`)
}
