import { string, objectid, model, date } from '../../../'

export default model('artwork', {
  title: string(),
  artistName: string(),
  partnerId: objectid(),
  imageSrc: string().uri(),
  date: date()
})
