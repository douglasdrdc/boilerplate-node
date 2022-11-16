import { Injectable } from '@nestjs/common';
import { ValidationException } from 'src/core/domain/exception';
import { Sample } from 'src/core/domain/model/sample';

@Injectable()
export class BaseSampleValidator {
  validateSampleId(sampleId: string): boolean {
    return !!sampleId;
  }

  async validateParams(params: Sample): Promise<void> {
    this.validateBlockedCustomer(params);
  }

  private validateBlockedCustomer(params: Sample) {
    if (params.name.toUpperCase() === 'DOUGLAS') {
      throw new ValidationException('This client is bloqued');
    }
  }
}
