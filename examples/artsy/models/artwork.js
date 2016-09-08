import { string, objectid, model, date } from 'joiql-mongo'

export default model('artwork', {
  title: string(),
  artistName: string(),
  partnerId: objectid(),
  imageSrc: string().uri(),
  date: date()
})
