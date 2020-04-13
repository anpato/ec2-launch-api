const AWS = require('aws-sdk')
import { Request, Response } from 'express'
import { LaunchBody, AwsParams } from './interfaces'
import { InstanceIds } from './types'
export default class Controller {
  public readonly path: string
  constructor() {
    this.path = '/instances'
  }

  async launchInstances(req: Request, res: Response) {
    const { secretKey, keyId, region, count } = req.query
    const {
      imageId,
      instanceType,
      keyName,
      subnetId,
      sgIds,
      tags
    }: LaunchBody = req.body
    try {
      const ec2 = new AWS.EC2({
        secretAccessKey: secretKey,
        accessKeyId: keyId,
        region
      })
      const params: AwsParams = {
        ImageId: imageId,
        InstanceType: instanceType,
        KeyName: keyName,
        MinCount: 1,
        MaxCount: Number(count) || 1,
        SubnetId: subnetId,
        SecurityGroupIds: sgIds,
        TagSpecifications: tags
      }
      const { Instances } = await ec2.runInstances(params).promise()
      const instanceIds = Instances.map((i: any) => i.InstanceId)
      res.send({ instances: instanceIds })
    } catch (error) {
      throw error
      // res.status(400).json({ error: error.message })
    }
  }

  async checkInstanceStatus(req: Request, res: Response) {
    const { secretKey, keyId, region, instanceIds } = req.query
    const ids: string = instanceIds as InstanceIds
    const idArr: string[] = ids.split(',')
    try {
      const ec2 = new AWS.EC2({
        secretAccessKey: secretKey,
        accessKeyId: keyId,
        region
      })
      const { InstanceStatuses } = await ec2
        .describeInstanceStatus({ InstanceIds: idArr })
        .promise()
      res.json({ status: InstanceStatuses })
    } catch (error) {
      throw error
      // res.status(400).json({ error: error.message })
    }
  }

  async getInstanceDetails(req: Request, res: Response) {
    try {
      const { secretKey, keyId, region, instanceIds } = req.query
      const ids: string = instanceIds as InstanceIds
      const idArr: string[] = ids.split(',')
      const ec2 = new AWS.EC2({
        secretAccessKey: secretKey,
        accessKeyId: keyId,
        region
      })
      const details = await ec2
        .describeInstances({ InstanceIds: idArr })
        .promise()
      res.send({ details })
    } catch (error) {
      throw error
      // res.status(400).json({ error: error.message })
    }
  }
  async stopInstances(req: Request, res: Response) {
    try {
      const { secretKey, keyId, region } = req.query
      const { instanceIds } = req.body
      const ec2 = new AWS.EC2({
        secretAccessKey: secretKey,
        accessKeyId: keyId,
        region
      })
      const stopStatus = await ec2
        .stopInstances({ InstanceIds: instanceIds })
        .promise()
      res.send({ stopStatus })
    } catch (error) {
      throw error
      // res.status(400).json({ error: error.message })
    }
  }

  async destroyInstances(req: Request, res: Response) {
    try {
      const { secretKey, keyId, region } = req.query
      const { instanceIds } = req.body
      const ec2 = new AWS.EC2({
        secretAccessKey: secretKey,
        accessKeyId: keyId,
        region
      })
      const destroyed = await ec2
        .terminateInstances({ InstanceIds: instanceIds })
        .promise()
      res.send({ destroyed })
    } catch (error) {
      throw error
      // res.status(400).json({ error: error.message })
    }
  }
}
