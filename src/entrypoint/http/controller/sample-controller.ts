import * as express from 'express';

import { controller, httpGet, interfaces } from 'inversify-express-utils';
import { OK } from 'http-status-codes';
import { CORE_TYPES } from "../../../core/types";
import ISampleService from "../../../core/domain/service/interface/iSample-service";
// import Sample from "../../../core/domain/model/sample";
import { inject } from 'inversify';
import { NotFoundError } from '../../../core/application/exception/error';

@controller('/sample')
export class SampleController implements interfaces.Controller {
    constructor(
        @inject(CORE_TYPES.ISampleService) private readonly service: ISampleService
    ) {}

    @httpGet('/')
    public async get(req: express.Request, res: express.Response) {
        const sampleId: number = 99; // validation Params
        const result = await this.service.getSample(sampleId);
        if (!result) { throw new NotFoundError(); }
        res.status(OK).json(result);
    }

}
