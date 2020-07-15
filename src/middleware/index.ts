import * as Logger from 'morgan'
import * as compression from 'compression'
import * as helmet from 'helmet'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
export const dependencies = [
  cors(),
  helmet(),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  Logger('dev'),
  compression()
]
