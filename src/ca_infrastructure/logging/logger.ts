import winston, { format, transports } from 'winston'; //library for logging
import LokiTransport from 'winston-loki';
//Pino-loki is alternative to winston-loki for better performance
const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      )
    }),
    new LokiTransport({
      host: 'http://127.0.0.1:3100',
      json: true,
      labels: { job: 'backendcleants_p2' },
      onConnectionError: (err) => console.error('Loki connection error:', err)
    }),
  ],
});

export default logger;