import Sample from "../../model/sample";

export default interface SampleMongoRepository {
    get(sampleId: number): Promise<any>;
    save(sample: Sample): Promise<void>;
    delete(sample: Sample): Promise<void>;
}
