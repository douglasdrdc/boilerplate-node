import { injectable } from "inversify";
import SampleClient from "../../core/domain/infrastructure/client/sample-client";

@injectable()
export default class ApiSampleClient implements SampleClient {
    getInfo(sampleParams: any): Promise<any> {
        return null;
    }
}