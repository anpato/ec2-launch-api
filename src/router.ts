import { Router } from 'express'
import InstanceRouter from './routes/InstanceRouter'
const AppRouter = Router()
AppRouter.use(InstanceRouter.path, InstanceRouter.router)

export default AppRouter
