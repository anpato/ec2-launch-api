import { Router } from 'express'
import { RouterParams } from '../interfaces'
import Controller from '../controller'

const controller = new Controller()

const InstanceRouter = Router()

InstanceRouter.post('/launch', controller.launchInstances)
InstanceRouter.get('/status', controller.checkInstanceStatus)
InstanceRouter.get('/details', controller.getInstanceDetails)
InstanceRouter.post('/stop', controller.stopInstances)
InstanceRouter.post('/destroy', controller.destroyInstances)

export default <RouterParams>{
  path: controller.path,
  router: InstanceRouter
}
