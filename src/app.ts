import Server from './server'
import 'dotenv/config'

let env = process.env.PORT
let port = env ? parseInt(env) : 3001

const app = new Server(port)

app.initServer()
