import Sample from "../../model/sample";

export default interface ISampleService {
    getAll(): Promise<Sample[]>;
    getById(id: string): Promise<Sample>;
    create(sample: Sample): Promise<string>;
}