import * as express from 'express';
import { controller, httpGet, interfaces, requestParam, response, httpPost, requestBody } from 'inversify-express-utils';
import { OK, CREATED } from 'http-status-codes';
import { CORE_TYPES } from '../../../core/types';
import SampleService from '../../../core/domain/service/interface/sample-service';
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
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: "*Resumo da Stack - Busca COMBO*"
                    }
                },
                {
                    type: "divider"
                },
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: "*Status da stack:* BOM \n :star: :star: ★ \n _Observação: Stack funcionando, porem, com pontos de atenção_"
                    },
                    accessory: {
                        type: "image",
                        image_url: "https://www.iconsdb.com/icons/preview/orange/speed-xxl.png",
                        alt_text: "Status Stack"
                    }
                },
                {
                    type: "divider"
                },
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: ":point_right: *Total de itens analisados: * 25"
                    }
                },
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: ":grin: *Total de itens com sucesso: * 21"
                    }
                },
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: ":face_with_monocle: *Total de itens com alertas: * 4"
                    }
                },
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: ":scream: *Total de itens com erro: * 0"
                    }
                },
                {
                    type: "actions",
                    elements: [
                        {
                            type: "button",
                            text: {
                                type: "plain_text",
                                emoji: true,
                                text: "Mais detalhes"
                            },
                            style: "primary",
                            value: "click_me_123"
                        }
                    ]
                },
                {
                    type: "divider"
                }
            ]
        });
    }

}
''