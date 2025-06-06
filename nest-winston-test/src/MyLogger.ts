import { LoggerService } from "@nestjs/common";
import { Logger, createLogger, format, transports } from "winston";

export class MyLogger implements LoggerService {
  private logger:Logger
   constructor(){
      this.logger = createLogger({
        level:'debug',
        format: format.combine(format.colorize(),format.simple()),
        transports: [
          new transports.Console(),
        ],
      })

   }

  log(message: string, context?: string) {
    this.logger.log('info',`---[${context}] ${message}`);
  }
  error(message: string, trace: string, context?: string) {
    this.logger.log('error',`---[${context}] ${message}`);
  }
  warn(message: string, context?: string) {
    this.logger.log('warn',`---[${context}] ${message}`);
  }
  debug?(message: string, context?: string) {
    this.logger.log('debug',`---[${context}] ${message}`);
  }
}