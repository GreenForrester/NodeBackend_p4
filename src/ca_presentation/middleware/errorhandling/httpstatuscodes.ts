export enum HttpStatusCode {
    OK = 200, //update and read
    CREATED = 201,
    DELETED = 204,
    FORBIDDEN = 403,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
  
    // Custom error codes
    DB_CONNECTION_ERROR = 1001, // Example custom error code
    CUSTOM_ERROR_CODE = 1002, // Another example
    // ... add more custom error codes as needed
  }