import { ContextLogger } from 'winston-context-logger';

export interface LoggerMetadata {
  unhandledError: string;
  warnError: string;
  requestPath: string;
  responseStatusCode: number;
  responseTime: number;
  originIp: string;
  userAgent: string;
}
export class AppLogger extends ContextLogger<LoggerMetadata> {}
