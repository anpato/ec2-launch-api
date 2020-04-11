import * as express from 'express'
import { Request, Response } from 'express'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import Router from './router'
import * as Logger from 'morgan'
import * as compression from 'compression'
import * as helmet from 'helmet'
const app = express()

app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(Logger('dev'))
app.use(compression())
app.use(`/api`, Router)
app.get('/', (req: Request, res: Response) => res.json({ status: 'Live' }))

app.listen(process.env.PORT || 3000, () => {
  console.log(`App listening on port ${process.env.PORT || 3000}!`)
})
