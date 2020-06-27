import Sample from "../../model/sample";

export default interface ISampleService {
    getSample(id: number): Promise<Sample>;
}