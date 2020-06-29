import { WError } from 'verror';


export class DatabaseError extends WError {
    constructor(cause: Error, message: string) {
        super({ cause, name: 'DatabaseError' }, message || 'DATABASE');
    }
}

export class ExternalServiceError extends WError {
    constructor(cause: Error, message: string) {
        super({ cause, name: 'ExternalServiceError' }, message || 'EXTERNAL_SERVICE');
    }
}

export class BusinessError extends WError {
    constructor(cause: Error, message: string) {
        super({ cause, name: 'BusinessError' }, message || 'BUSINESS');
    }
}

export class ValidationError extends WError {
    constructor(message: string) {
        super({ name: 'ValidationError' }, message || 'VALIDATION');
    }
}

export class NotFoundError extends WError {
    constructor(message?: string) {
        super({ name: 'NotFoundError' }, message || 'NOT_FOUND');
    }
}

export class ForbiddenError extends WError {
    constructor(cause: Error, message: string) {
        super({ cause, name: 'FORBIDDEN' }, message || 'FORBIDEN');
    }
}

export class BadRequestError extends WError {
    constructor(message?: string) {
        super({ name: 'BadRequestError' }, message || 'BAD_REQUEST');
    }
}

export class NotAuthorizedError extends WError {
    constructor(message?: string) {
        super({ name: 'NotAuthorizedError' }, message || 'NOT_AUTHORIZED');
    }
}

