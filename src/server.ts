import * as express from 'express'
import { dependencies } from './middleware'
import Router from './router'

export default class Server {
  private app: express.Application
  private port: Number
  constructor(port: Number) {
    this.app = express()
    this.port = port
  }

  private applyMiddleware() {
    // Init dependency array
    dependencies.forEach((d: any) => {
      this.app.use(d)
    })
  }

  private initRouter() {
    this.app.disable('x-powered-by')
    this.app.use('/api', Router)
    this.app.get('/', (req: express.Request, res: express.Response) =>
      res.json({ Status: 'OK' })
    )
  }

  public initServer() {
    this.app.listen(this.port, () => {
      this.applyMiddleware()
      this.initRouter()
      console.log(`Server Listening:  ${this.port}`)
    })
  }
}
