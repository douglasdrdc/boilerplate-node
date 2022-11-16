import { Sample } from '../model/sample';

export abstract class SampleRepository {
  abstract getAll(): Promise<Sample[]>;
  abstract getById(sampleId: string): Promise<Sample | null>;
  abstract create(sample: Sample): Promise<string>;
  abstract delete(sampleId: number): Promise<void>;
}
