import { IValidatorOptions, Validator } from "../core/Validator";

export class ChineseValidator extends Validator {
    validate(value: any, options?: IValidatorOptions): boolean {
        if(!/^[\u4e00-\u9fa5]{1,}$/.test(value)) {
            this.error("V-ERR-M-104", "value is not chinese text", options);
            return false;
        }
        return true;
    }
}
