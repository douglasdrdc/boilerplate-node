import { Injectable } from '@nestjs/common';
import { SampleClient } from 'src/core/domain/client/sample-client';

@Injectable()
export class ApiSampleClient implements SampleClient {
  async getInfo(_sampleParams: unknown): Promise<unknown> {
    return null;
  }
}
