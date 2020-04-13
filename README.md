# Ec2 Launch Api

### Note

**Your credentials do not get stored anywhere in this application.
This api interacts with the nodejs aws-sdk directly and creates a new ec2 class instance on each request.**

### Features

- Manage Ec2 Instances
- Launch Instances
- Stop Instances
- Delete Instances

Api Base Route: [](`https://ec2-launch-api.herokuapp.com/`)

All requests use the following header:

> Content-Type: 'application/json'

## Launching an Ec2 Instance

```http
[POST] {BasePath}/api/instances/launch?secretKey={}&keyId={}&region={}&count={}
Content-Type: 'application/json'
```

Params:

```
secretKey:Aws Secret Key
keyId: Aws Access Key Id
region: Aws Region Ex: {us-east-2}
[Optional] count: Max Number of instances to launch , if omitted defaults to 1
```

Body:

```js
{
    imageId: 'ami-****',
    instanceType: 't2-micro',
    keyName: '***', //Ssh Key used to connect to instance
    subnetId: 'subnet-***',
    sgIds:['sg-****'],
    tags: [
    {
      ResourceType: "instance",
      Tags: [
        {
          Key: "Name",
          Value: "Ec2 Instance Name"
        }
      ]
    }
  ]
}
```

Requests to this endpoint will return an array of ids for all launched instances.

Example:

```json
{
  "instances": ["i-123445"]
}
```

## Checking status of one or more instances

**Instance Ids should be added in the query as comma seperated values.**

Will only return a status once the instance is live. If instance is not live, this endpoint will return an empty array.

```http
[GET] {{BasePath}}/api/instances/status?secretKey={}&keyId={}&region={}&instanceIds=id1,id2,id3'
Content-Type: 'application/json'
```

Response:

```json
{
  "status": [
    {
      "AvailabilityZone": "region",
      "Events": [],
      "InstanceId": "i-******",
      "InstanceState": {
        "Code": 16,
        "Name": "running"
      },
      "InstanceStatus": {
        "Details": [
          {
            "Name": "reachability",
            "Status": "passed"
          }
        ],
        "Status": "ok"
      },
      "SystemStatus": {
        "Details": [
          {
            "Name": "reachability",
            "Status": "passed"
          }
        ],
        "Status": "ok"
      }
    }
  ]
}
```

## Checking the details of one or more instances

**Instance Ids should be added in the query as comma seperated values.**

```http
[GET] {{BasePath}}/api/instances/details?secretKey={}&keyId={}&region={}&instanceIds=id1,id2,id3'
Content-Type: 'application/json'
```

Response:

```json
{
    "details":  "Reservations": [
      {
        "Groups": [],
        "Instances": [
          {
            "AmiLaunchIndex": 0,
            "ImageId": "ami-*****",
            "InstanceId": "i-****",
            "InstanceType": "t2.micro",
            "KeyName": "*****",
            "LaunchTime": "2020-04-11T22:39:13.000Z",
            "Monitoring": {
              "State": "disabled"
            },
            "Placement": {
              "AvailabilityZone": "Region",
              "GroupName": "",
              "Tenancy": "default"
            },
            "PrivateDnsName": "****.ec2.internal",
            "PrivateIpAddress": "********",
            "ProductCodes": [],
            "PublicDnsName": "****.compute-1.amazonaws.com",
            "PublicIpAddress": "****",
            "State": {
              "Code": 16,
              "Name": "running"
            },
            "StateTransitionReason": "",
            "SubnetId": "subnet-***",
            "VpcId": "vpc-*****",
            "Architecture": "x86_64",
            "BlockDeviceMappings": [
              {
                "DeviceName": "/dev/sda1",
                "Ebs": {
                  "AttachTime": "2020-04-11T22:39:14.000Z",
                  "DeleteOnTermination": true,
                  "Status": "attached",
                  "VolumeId": "vol-****"
                }
              }
            ],
            "ClientToken": "",
            "EbsOptimized": false,
            "EnaSupport": true,
            "Hypervisor": "xen",
            "ElasticGpuAssociations": [],
            "ElasticInferenceAcceleratorAssociations": [],
            "NetworkInterfaces": [
              {
                "Association": {
                  "IpOwnerId": "amazon",
                  "PublicDnsName": "****.compute-1.amazonaws.com",
                  "PublicIp": "****"
                },
                "Attachment": {
                  "AttachTime": "2020-04-11T22:39:13.000Z",
                  "AttachmentId": "eni-attach-****",
                  "DeleteOnTermination": true,
                  "DeviceIndex": 0,
                  "Status": "attached"
                },
                "Description": "",
                "Groups": [
                  {
                    "GroupName": "****",
                    "GroupId": "*****"
                  }
                ],
                "Ipv6Addresses": [],
                "MacAddress": "***",
                "NetworkInterfaceId": "eni-****",
                "OwnerId": "****",
                "PrivateDnsName": "****.ec2.internal",
                "PrivateIpAddress": "****",
                "PrivateIpAddresses": [
                  {
                    "Association": {
                      "IpOwnerId": "amazon",
                      "PublicDnsName": "****.compute-1.amazonaws.com",
                      "PublicIp": "****"
                    },
                    "Primary": true,
                    "PrivateDnsName": "***.ec2.internal",
                    "PrivateIpAddress": "****"
                  }
                ],
                "SourceDestCheck": true,
                "Status": "in-use",
                "SubnetId": "***",
                "VpcId": "****",
                "InterfaceType": "interface"
              }
            ],
            "RootDeviceName": "/dev/sda1",
            "RootDeviceType": "ebs",
            "SecurityGroups": [
              {
                "GroupName": "***",
                "GroupId": "****"
              }
            ],
            "SourceDestCheck": true,
            "Tags": [
              {
                "Key": "Name",
                "Value": "Ec2 Instance Name"
              }
            ],
            "VirtualizationType": "hvm",
            "CpuOptions": {
              "CoreCount": 1,
              "ThreadsPerCore": 1
            },
            "CapacityReservationSpecification": {
              "CapacityReservationPreference": "open"
            },
            "HibernationOptions": {
              "Configured": false
            },
            "Licenses": [],
            "MetadataOptions": {
              "State": "applied",
              "HttpTokens": "optional",
              "HttpPutResponseHopLimit": 1,
              "HttpEndpoint": "enabled"
            }
          }
        ],
        "OwnerId": "*****",
        "ReservationId": "****"
      }
    ]
  }
}
```

## Stopping Instances

```http
[POST] {{BasePath}}/api/instances/stop?secretKey={}&keyId={}&region={}
Content-Type: 'application/json'
```

Send desired instance ids to stop in the request body.

Request Body:

```json
{
  "instanceIds": ["i-****", "i-****]
}
```

Send desired instance ids to stop in the request body.

Response:

```json
{
  "stopStatus": {
    "StoppingInstances": [
      {
        "CurrentState": {
          "Code": 64,
          "Name": "stopping"
        },
        "InstanceId": "i-*****",
        "PreviousState": {
          "Code": 16,
          "Name": "running"
        }
      }
    ]
  }
}
```

## Destroying Instances

```http
[POST] {{BasePath}}/api/instances/destroy?secretKey={}&keyId={}&region={}
Content-Type: 'application/json'
```

Send desired instance ids to destroy in the request body.

Request Body:

```json
{
  "instanceIds": ["i-****", "i-****]
}
```

Response:

```json
{
  "destroyed": {
    "TerminatingInstances": [
      {
        "CurrentState": {
          "Code": 48,
          "Name": "terminated"
        },
        "InstanceId": "i-****",
        "PreviousState": {
          "Code": 80,
          "Name": "stopped"
        }
      }
    ]
  }
}
```
