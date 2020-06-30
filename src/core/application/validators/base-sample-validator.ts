import { injectable } from "inversify";
import * as Joi from 'joi';
import * as Errors from '../exception/error';
import SampleValidator from "./interface/sample-validator";
import Sample from "../../domain/model/sample";

@injectable()
export default class BaseSampleValidator implements SampleValidator {
    validateSampleId(sampleId: any): boolean {
        return !!sampleId;
    }

    async validateParams(params: any): Promise<void> {
        const schema = this.createSchema();
        return new Promise((resolve, reject) => {
            Joi.validate(params, schema, (err, search) => {
                if (err) {
                    return reject(err);
                }

                const validations = this.getCreationValidations(search);
                const { exception }: any = validations.find(validation => validation.invalid === true) || {};
                return exception ? reject(exception) : resolve();
            });
        });
    }

    private createSchema() {
        return Joi.object().keys({
            name: Joi.string().min(3).max(100).required().error(new Errors.ValidationError('Invalid Name')),
        });
    }

    private getCreationValidations(params: Sample) {
        return [
          {
            invalid: params.name.toUpperCase() === "DOUGLAS",
            exception: new Errors.ValidationError('This client is bloqued'),
          }
        ];
      }
}