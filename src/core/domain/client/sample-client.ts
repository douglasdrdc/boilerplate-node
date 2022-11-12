export abstract class SampleClient {
  abstract getInfo(sampleParams: unknown): Promise<unknown>;
}
