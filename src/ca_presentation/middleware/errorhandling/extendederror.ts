export class ExtendedError extends Error 
{
    public statusCode: number;
    public message: string;
    public typeoferror:string;
    public originmessage: string;
    public timestamp: Date;
  
    constructor(statusCode: number, message: string, type:string , error:Error) 
    {
      super();
      this.statusCode = statusCode;                      //Status code enumeration
      this.typeoferror = type;                           //Type of error
      this.message = message;                            //message
      this.originmessage = error.message;                //origin message
      this.timestamp = new Date();                       //timestamp
      this.stack = error.stack;                          //stack trace
      Object.setPrototypeOf(this, new.target.prototype); // Ensure proper inheritance
    }
  }