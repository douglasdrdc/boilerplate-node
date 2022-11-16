import { Sample } from '../../../core/domain/model/sample';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { BaseSampleValidator } from 'src/core/application/validators';
import { BaseSampleService } from 'src/core/domain/service/base-sample-service';
import { ValidationException } from 'src/core/domain/exception';
import { SampleDto } from 'src/entrypoint/dto/sample-dto';

@Controller('/sample')
export class SampleController {
  constructor(
    private readonly service: BaseSampleService,
    private readonly validator: BaseSampleValidator,
  ) {}

  @Get()
  public async getSamples() {
    const result = await this.service.getAll();
    return result;
  }

  @Get('/:id')
  public async getSampleId(@Param('id') sampleId: string) {
    const isValid = this.validator.validateSampleId(sampleId);
    if (!isValid) {
      throw new ValidationException('Invalid parameter');
    }

    const result = await this.service.getById(sampleId);
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  @Post()
  public async createSample(@Body() params: SampleDto) {
    await this.validator.validateParams(params);

    const result = await this.service.create(params);
    return { id: result };
  }

  @Post('/slack')
  @HttpCode(HttpStatus.OK)
  public async createSlackSample(@Body() _params: Sample) {
    return {
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '*Resumo da Stack - Busca COMBO*',
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '*Status da stack:* BOM \n :star: :star: ★ \n _Observação: Stack funcionando, porem, com pontos de atenção_',
          },
          accessory: {
            type: 'image',
            image_url:
              'https://www.iconsdb.com/icons/preview/orange/speed-xxl.png',
            alt_text: 'Status Stack',
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: ':point_right: *Total de itens analisados: * 25',
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: ':grin: *Total de itens com sucesso: * 21',
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: ':face_with_monocle: *Total de itens com alertas: * 4',
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: ':scream: *Total de itens com erro: * 0',
          },
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: {
                type: 'plain_text',
                emoji: true,
                text: 'Mais detalhes',
              },
              style: 'primary',
              value: 'click_me_123',
            },
          ],
        },
        {
          type: 'divider',
        },
      ],
    };
  }
}
