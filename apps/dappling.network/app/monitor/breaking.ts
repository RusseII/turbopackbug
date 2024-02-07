import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import { Table } from 'dynamodb-toolbox'
import { Entity, EntityItem } from 'dynamodb-toolbox'

export const enforceEnvVars = (envVars: string[]) => {
  const envVarsJson = {} as { [key: string]: string }
  envVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable ${envVar}`)
    }
    envVarsJson[envVar] = process.env[envVar] as string
  })

  return envVarsJson
}

export const ClientDNSWithoutTable = new Entity({
  name: 'DNS',
  attributes: {
    domain: { partitionKey: true, prefix: 'DNS#', type: 'string' },
    subscriberEmails: { type: 'set', setType: 'string' },
    sk: { sortKey: true, default: 'DNS' },
    NS: { type: 'list' },
  },
} as const)

export type DatabaseItem<T extends Entity> = Omit<
  EntityItem<T>,
  'created' | 'modified' | 'entity'
>
export type DNSItem = DatabaseItem<typeof ClientDNSWithoutTable>

export enum DomainType {
  PREVIEW = 'preview',
  PRODUCTION = 'production',
  ENS = 'ens',
  DAPPLING_ENS = 'dapplingEns',
}

export enum DeploymentType {
  PREVIEW = 'preview',
  PRODUCTION = 'production',
}

const marshallOptions = {
  convertEmptyValues: false,
}

const translateConfig = { marshallOptions }

const {
  AWS_KEY_ID: accessKeyId,
  AWS_SECRET_ACCESS_KEY: secretAccessKey,
  DYNAMO_TABLE: databaseTableName,
} = enforceEnvVars(['AWS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'DYNAMO_TABLE'])

const DocumentClient = DynamoDBDocumentClient.from(
  new DynamoDBClient({
    region: 'us-east-1',
    credentials: { accessKeyId, secretAccessKey },
  }),
  translateConfig
)

const table = new Table({
  name: databaseTableName,
  partitionKey: 'pk',
  sortKey: 'sk',
  indexes: {
    ['_et-_ct']: {
      partitionKey: '_et',
      sortKey: '_ct',
    },
  },
  DocumentClient,
})

export const DNS = ClientDNSWithoutTable.setTable(table)

export const getDNSRecords = async () => {
  // return 'meow'
  const projectResult = await DNS.query('DNS', {
    index: '_et-_ct',
    limit: 5000,
    select: 'specific_attributes',
    attributes: ['entity', 'sk', 'domain', 'NS', 'created', 'modified'],
  })
  return projectResult?.Items || []
}
