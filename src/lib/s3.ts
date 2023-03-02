import S3 from 'aws-sdk/clients/s3'

export const s3 = new S3({
  apiVersion: '2006-03-01',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  signatureVersion: 'v4'
})

// When you create a presigned URL, you must provide:
// 1.your security credentials
// 2.specify a bucket name, an object key, an HTTP method (PUT for uploading objects),
// 3.and an expiration date and time.

// The presigned URLs are valid only for the specified duration. That is, you must start the action before the expiration date and time.
