import { IValidatorOptions,Validator } from "../core/Validator";

export class MobileValidator extends Validator {
    validate(value: any, options?: IValidatorOptions): boolean {
        if(!/^1[0-9]{10}$/.test(value)) {
            this.error("V-ERR-M-100", "Mobile number is not a correct format data", options);
            return false;
        }
        return true;
    }
}
