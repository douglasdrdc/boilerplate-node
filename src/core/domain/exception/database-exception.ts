import { ServiceUnavailableException } from '@nestjs/common';

export class DatabaseException extends ServiceUnavailableException {}
