import Sample from "../../../domain/model/sample";

export default interface SampleValidator {
    validateSampleId(sampleId: any): boolean;
    validateParams(params: any): Promise<void>;
}