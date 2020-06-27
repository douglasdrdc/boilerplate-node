import { injectable } from "inversify";
import SampleMongoRepository from "../../core/domain/infrastructure/repository/sample-mongo-repository";
import { DatabaseError } from "../../core/application/exception/error";
import Sample from "../../core/domain/model/sample";

@injectable()
export default class MongoSampleRepository implements SampleMongoRepository {   
    async get(sampleId: number): Promise<any> {
        try {
            return <Sample>({ id: 1, name: 'Sample 1' });
        } catch (err) {
            throw new DatabaseError(err, 'Error in recovery Sample of mongo.');
        }
    }

    async save(sample: Sample): Promise<void> {
        try {
            return null;
        } catch (err) {
            throw new DatabaseError(err, 'Error in save Sample of mongo.');
        }
    }

    async delete(sample: Sample): Promise<void> {
        try {
            return null;
        } catch (err) {
            throw new DatabaseError(err, `Error in deliting Sample of mongo`);
        }
    }
}