import { BaseSampleService } from 'src/core/domain/service/base-sample-service';
import { Test } from '@nestjs/testing';
import { SampleRepository } from 'src/core/domain/repository/sample-repository';
import { Sample } from 'src/core/domain/model/sample';

const proto = BaseSampleService.prototype;

describe(BaseSampleService.name, () => {
  let target: BaseSampleService;
  let repository: SampleRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        BaseSampleService,
        {
          provide: SampleRepository,
          useValue: (repository = {} as any),
        },
      ],
    }).compile();

    target = moduleRef.get(BaseSampleService);
  });

  describe(proto.create.name, () => {
    beforeEach(() => {
      repository.create = jest.fn().mockResolvedValue('expected value');
    });

    it('should create user', async () => {
      const sample = 'sample value' as unknown as Sample;

      const result = await target.create(sample);

      expect(repository.create).toHaveCallsLike(['sample value']);
      expect(result).toBe('expected value');
    });
  });
});
