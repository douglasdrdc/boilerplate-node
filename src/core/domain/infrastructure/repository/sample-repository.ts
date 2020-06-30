import Sample from "../../model/sample";

export default interface SampleRepository {
    getAll(): Promise<Sample[]>;
    getById(sampleId: string): Promise<Sample>;
    create(sample: Sample): Promise<string>;
    delete(sampleId: number): Promise<void>;
}
