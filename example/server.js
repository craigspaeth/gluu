import './models'
import { app } from '../'
import router from './router'

const server = app(router)

export default server
