import * as express from 'express';
import { 
    ValidationError, 
    NotFoundError, 
    BadRequestError, 
    NotAuthorizedError 
} from '../../../core/application/exception/error';

export default () => (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    if (err instanceof ValidationError) {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY);
      } else if (err instanceof NotFoundError) {
        res.status(HttpStatus.NOT_FOUND);
      } else if (err instanceof BadRequestError) {
        res.status(HttpStatus.BAD_REQUEST);
      } else if (err instanceof NotAuthorizedError) {
        res.status(HttpStatus.NOT_AUTHORIZED);
      } else {
        res.status(HttpStatus.INTERNAL_ERROR);
      }

      const response = new ErrorResponse(err.name, err.message, err.details);
      return res.json(response);
};

class ErrorResponse {
    type: string;
    message: string;
    details: any;
    constructor(type: string, message: string, details?: any) {
        this.type = type;
        this.message = message;
        this.details = details;
    }
}

enum HttpStatus {
    OK = 200,
    UNPROCESSABLE_ENTITY = 422,
    NOT_FOUND = 404,
    BAD_REQUEST = 400,
    NOT_AUTHORIZED = 401,
    FORBIDEN = 403,
    INTERNAL_ERROR = 500,
}