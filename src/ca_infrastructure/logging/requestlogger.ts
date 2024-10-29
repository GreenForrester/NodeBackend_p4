// middleware for app.ts
import { Request, Response, NextFunction } from 'express';
import logger from '../logging/logger'; // Adjust the path if needed

export const logRequest = (req: Request, res: Response, next: NextFunction) => {

    // Exclude requests to /metrics prometheus
    if (req.path === '/metrics') 
    {
      return next();
    }
  // Log the incoming request
  logger.info('HTTP Request', {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
    timestamp: new Date().toISOString(),
  });

  next();
};
