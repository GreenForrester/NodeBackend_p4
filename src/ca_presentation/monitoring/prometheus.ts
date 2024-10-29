import client from 'prom-client';
import { Request, Response, NextFunction } from 'express';

// Create a Registry which registers the metrics
const register = new client.Registry();

// Add a default metrics collection
client.collectDefaultMetrics({ register });

// Create a custom metric
const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 0.5, 1, 1.5, 2, 5]
});


// Register the custom metric
register.registerMetric(httpRequestDurationMicroseconds);

// Middleware to collect metrics - end point monitoring 
const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const requestPath = req.originalUrl || req.url;
  const end = httpRequestDurationMicroseconds.startTimer();
  res.on('finish', () => {
    end({ method: req.method, route: requestPath, code: res.statusCode });
  });
  next();
};

// Endpoint to expose metrics
const metricsEndpoint = async (req: Request, res: Response) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
};

export { metricsMiddleware, metricsEndpoint };
