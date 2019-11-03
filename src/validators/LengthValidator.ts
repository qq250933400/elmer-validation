import { IValidatorOptions, Validator } from "../core/Validator";
import { LengthValidatorOptions } from "./ValidatorTypes";

export class LengthValidator extends Validator {
    validate<T>(value: any, options?: T & IValidatorOptions): boolean {
        const allLength = this.getStrLength(value);
        const minLength = (<LengthValidatorOptions>options).minLength || -1;
        const maxLength = (<LengthValidatorOptions>options).maxLength || -1;
        if(minLength > 0 && maxLength > minLength) {
            if(minLength > allLength || allLength > maxLength) {
                this.error("V-ERR-M-105", `Text length must be greater than or equal to ${minLength} and less than or equal to ${maxLength}`, options);
                return false;
            }
        } else if(minLength <= 0 && maxLength > 0) {
            if(allLength > maxLength) {
                this.error("V-ERR-M-106", `Text length must be less than or equal to ${maxLength}`, options);
                return false;
            }
        } else if(minLength > 0 && maxLength < 0) {
            if(allLength < minLength) {
                this.error("V-ERR-M-107", `Text length must be greater than or equal to ${minLength}`, options);
                return false;
            }
        }
        return true;
    }
    private getStrLength(value:string):number {
        if(this.isEmpty(value)) {
            return 0;
        } else {
            let allLen = 0;
            for(let i=0,mLen = value.length; i<mLen; i++) {
                const tmpChar = value.substr(i,1);
                if(/[^\x00-\xff]/.test(tmpChar)) {
                    allLen += 2;
                } else {
                    allLen += 1;
                }
            }
            return allLen;
        }
    }
}
