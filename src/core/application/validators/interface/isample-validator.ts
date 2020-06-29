import Sample from "../../../domain/model/sample";

export default interface ISampleValidator {
    validateSampleId(sampleId: any): boolean;
    validateParams(params: any): Promise<void>;
}