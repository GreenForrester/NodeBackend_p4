import { HttpStatusCode } from './httpstatuscodes';

export const HttpStatusMessages: Record<HttpStatusCode, string> = 
{
  [HttpStatusCode.OK]: 'The request has succeeded.',
  [HttpStatusCode.CREATED]: 'The request has been fulfilled and resulted in a new resource being created.',
  [HttpStatusCode.DELETED]: 'The request has been fulfilled and resulted in no content.',
  [HttpStatusCode.FORBIDDEN]: 'You do not have permission to access this resource.',
  [HttpStatusCode.BAD_REQUEST]: 'The request could not be understood by the server due to malformed syntax.',
  [HttpStatusCode.UNAUTHORIZED]: 'Authentication is required and has failed or has not yet been provided.',
  [HttpStatusCode.NOT_FOUND]: 'The server can not find the requested resource.',
  [HttpStatusCode.INTERNAL_SERVER_ERROR]: 'The server encountered an unexpected condition that prevented it from fulfilling the request.',
  [HttpStatusCode.DB_CONNECTION_ERROR]: 'A database connection error occurred.', 
  [HttpStatusCode.CUSTOM_ERROR_CODE]: 'Database Operation failed.' 
}

// You can access above like HttpStatusMessages[HttpStatusCode.NOT_FOUND]
