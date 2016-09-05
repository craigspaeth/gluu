import { string, objectid, model, date, object, array, number } from '../../../'

export default model('show', {
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
