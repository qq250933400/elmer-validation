import { IValidatorOptions, Validator } from "../core/Validator";

export class ArrayValidator extends Validator {
    validate(value: any, options?: IValidatorOptions): boolean {
        if(Object.prototype.toString.call(value) !== "[object Array]") {
            this.error("V-ERR-M-103", "Not Array type data", options);
            return false;
        }
        return true;
    }
}
