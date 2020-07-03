import * as express from 'express';
import { controller, httpGet, interfaces, requestParam, response, httpPost, requestBody } from 'inversify-express-utils';
import { OK, CREATED } from 'http-status-codes';
import { CORE_TYPES } from ../../../core/types;
import SampleService from ../../../core/domain/service/interface/sample-service;
import SampleValidator from '../../../core/application/validators/interface/sample-validator';
import { inject } from 'inversify';
import { NotFoundError, ValidationError } from '../../../core/application/exception/error';
import { request } from 'http';
import Sample from '../../../core/domain/model/sample';

@controller('/sample')
export class SampleController implements interfaces.Controller {
    constructor(
        @inject(CORE_TYPES.SampleService) private readonly service: SampleService,
        @inject(CORE_TYPES.SampleValidator) private readonly validator: SampleValidator
    ) {}

    @httpGet('/')
    public async getSamples(req: express.Request, res: express.Response) {
        const result = await this.service.getAll();
        if ((result || []).length <= 0) { throw new NotFoundError(); }
        res.status(OK).json(result);
    }

    @httpGet('/:id')
    //public async get(req: express.Request, res: express.Response) {
    public async getSampleId(@requestParam('id') sampleId: string, @response() res: express.Response) {
        const isValid = this.validator.validateSampleId(sampleId);
        if(!isValid) {
            throw new ValidationError('Invalid parameter');
        }

        const result = await this.service.getById(sampleId);
        if (!result) { throw new NotFoundError(); }
        res.status(OK).json(result);
    }

    @httpPost('/')
    public async createSample(@requestBody() params: Sample, @response() res: express.Response) {
        await this.validator.validateParams(params);
    
        const result = await this.service.create(<Sample>params);
        res.status(CREATED).json({ id: result });
    }

    @httpPost('/slack')
    public async createSlackSample(@requestBody() params: Sample, @response() res: express.Response) {
        res.status(OK).json({
            blocks: [
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: '*Its 80 degrees right now.*'
                    }
                },
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: 'Partly cloudy today and tomorrow'
                    }
                }
            ]
        });
    }

}
''