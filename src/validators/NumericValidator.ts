import { IValidatorOptions, Validator } from "../core/Validator";

export class NumericValidator extends Validator {
    validate(value: any, options?: IValidatorOptions): boolean {
        if(!/^([0-9]{1,})$|^([0-9]{1,}\.[0-9]{1,})$/.test(value)) {
            this.error("V-ERR-M-102", "Not numeric type data", options);
            return false;
        }
        return true;
    }
}
