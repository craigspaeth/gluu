import { string, objectid, model, date, object, array, number } from '../../../'

export const show = model('show', {
  name: string(),
  description: string(),
  partnerId: objectid(),
  artworkIds: array().items(objectid()),
  startAt: date(),
  endAt: date(),
  address: object({
    street: string(),
    city: string(),
    country: string(),
    state: string(),
    coordinates: object({ lat: number(), lng: number() })
  })
})

export const artwork = model('artwork', {
  title: string(),
  artistName: string(),
  partnerId: objectid(),
  imageSrc: string().uri(),
  date: date()
})

export const partner = model('partner', {
  name: string()
})
