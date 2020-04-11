import * as Express from 'express'
export interface BaseParams extends Express.Request {
  secretKey: string
  keyId: string
  region: string
}
interface Ec2Tags {
  Key: string
  Value: string
}
interface Ec2TagSpecs {
  ResourceType: string
  Tags: Ec2Tags[]
}
export interface LaunchBody {
  imageId: string
  instanceType: string
  keyName: string
  subnetId: string
  sgIds: string[]
  tags: Ec2TagSpecs
}
export interface LaunchParams {
  count: number
  secretKey: string
  keyId: string
  region: string
}

export interface RouterParams {
  path: string
  router: any
}

export interface AwsParams {
  ImageId: string
  InstanceType: string
  KeyName: string
  MinCount: number
  MaxCount: number
  SubnetId: string
  SecurityGroupIds: string[]
  TagSpecifications: Ec2TagSpecs
}
