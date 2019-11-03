import { IValidatorOptions, Validator } from "../core/Validator";

export class EmailValidator extends Validator {
    validate(value: any, options?: IValidatorOptions): boolean {
        if(!/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(value)) {
            this.error("V-ERR-M-101", "The email address is not a correct format data", options);
            return false;
        }
        return true;
    }
}
