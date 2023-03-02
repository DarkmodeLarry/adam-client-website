Stack:
NextJs
Typescript
tRPC
Prisma
Cockroach Db
AWS S3

- Images hosted on S3
- Presigned Url

Request Method: `GET`
Response: `"Url" parameter is valid but upstream response is invalid`

- Bucket: Turned off 'Block public access'
- Bucket: updated Bucket Policy , 'allowPublicRead', Action:S3:GetObject
- Bucket: updated CORS config. Allowed Methods: Get, Post, Put
- IAM: updated Policy: Allow: S3:GetObject

403 Forbidden status code

- indicates that the server understood the request,
- but refuses to authorize access to the requested resource.
- This response: the client has authenticated successfully but not authorized to access the requested resource.

The response message "url parameter is valid but upstream response is invalid" suggests that the URL parameter in the request is valid,
but the server that provides the resource is returning an invalid response.

This could be due to:
-an issue with the server configuration or
-a problem with the resource itself.

`404
