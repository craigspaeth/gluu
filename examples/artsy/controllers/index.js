import Lokka from 'lokka'
import Transport from 'lokka-transport-http'
import tree from 'universal-tree'
import { find, remove, clone } from 'lodash'
import showView from '../views/index'

const api = new Lokka({
  transport: new Transport('http://localhost:3000/api')
})

export const state = tree({
  show: {},
  user: {},
  modalOpen: false
})

export const show = async (ctx) => {
  const { show, artworks, partner, user } = await ctx.bootstrap(async () => {
    const { show } = await api.query(`{ show(_id: "${ctx.params.id}") {
      _id
      name
      description
      artworkIds
      partnerId
      startAt
      endAt
      address {
        city
        street
      }
    } }`)
    const { a, partner, user } = await api.query(`{
      a: artwork(_id: "${show.artworkIds[0]}") {
        title artistName date imageSrc _id
      }
      partner(_id: "${show.partnerId}") {
        name
      }
      user {
        name _id following { id model }
      }
    }`)
    return { show, artworks: [a], partner, user }
  })
  state.set('user', user)
  state.set('show', show)
  state.select('show').set('artworks', artworks)
  state.select('show').set('partner', partner)
  ctx.render({ body: showView })
}

export const toggleFollow = async (model, id) => {
  const following = clone(state.get('user').following) || []
  if (find(following, { id })) remove(following, { id })
  else following.push({ model, id })
  state.select('user').set('following', following)
  const followsStr = following.map((f) =>
    `{ model: "${f.model}" id: "${f.id}" }`
  ).join(' ')
  await api.mutate(`{
    user: updateUser(
      _id: "${state.get('user')._id}"
      following: [${followsStr}]
    ) { name }
  }`, { following })
}

export const toggleModal = async () => {
  state.set('modalOpen', !state.get('modalOpen'))
}
