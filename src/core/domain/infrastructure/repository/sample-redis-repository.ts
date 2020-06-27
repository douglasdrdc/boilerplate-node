import Sample from "../../model/sample";

export default interface SampleRedisRepository {
    get(sampleId: number): Promise<Sample>;
    save(sample: Sample): Promise<void>;
    delete(sample: Sample): Promise<void>;
}
