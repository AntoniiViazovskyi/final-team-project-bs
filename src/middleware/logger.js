import pino from 'pino-http';

export const logger = pino({
  level: 'info',
  transport:
    process.env.NODE_ENV === 'production'
      ? undefined
      : {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'HH:MM:ss',
            ignore: 'pid,hostname',
            messageFormat:
              '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
            hideObject: true,
          },
        },
});
