import winston from "winston";
import 'winston-daily-rotate-file';
const  logger  = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
      winston.format.label({ label:   '标签' }),
      winston.format.colorize(),
      winston.format.simple()
    // winston.format.timestamp(),
    // winston.format.json(),
    
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.DailyRotateFile({
      level: 'info', 
      dirname: 'log2', 
      filename: 'test-%DATE%.log', 
      datePattern: 'YYYY-MM-DD HH:mm:ss', 
      maxSize: '20m', 
      maxFiles: '14d' 
    })
    //new winston.transports.File({ dirname: 'log', filename: 'test.log' ,maxsize: 1024}), // 1KB
  ],
  rejectionHandlers: [
    new winston.transports.File({ dirname: 'log3', filename: 'rejection.log' ,maxsize: 1024}), // 1KB 这个是捕获promise的异常
  ],
  
});

logger.debug('Debugging information');
logger.info('Hello world');
logger.warn('Warning message');