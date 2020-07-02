import { injectable } from "inversify";
import * as Joi from 'joi';
import SampleValidator from "./interface/sample-validator";
import Sample from "../../domain/model/sample";
import { ValidationError } from "../exception/error";

@injectable()
export default class BaseSampleValidator implements SampleValidator {
    validateSampleId(sampleId: any): boolean {
        return !!sampleId;
    }

    async validateParams(params: any): Promise<void> {
        const schema = this.createSchema();
        return new Promise((resolve, reject) => {
            Joi.validate(params, schema, (err: any, search: any) => {
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
            name: Joi.string().min(3).max(100).required().error(() => new ValidationError('Invalid Name')),
        });
    }

    private getCreationValidations(params: any) {
        return [
          {
            invalid: params.name.toUpperCase() === "DOUGLAS",
            exception: new ValidationError('This client is bloqued'),
          }
        ];
      }
}