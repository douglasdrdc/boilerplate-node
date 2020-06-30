import Sample from "../../model/sample";

export default interface SampleService {
    getAll(): Promise<Sample[]>;
    getById(id: string): Promise<Sample>;
    create(sample: Sample): Promise<string>;
}