import { Common } from "elmer-common";

export interface IValidatorErrorMessage {
    errorCode: string;
    message: string;
}
export interface IValidatorOptions {
    errmsg?: IValidatorErrorMessage[];
    isRequired?: boolean;
}

export abstract class Validator extends Common {
    errCode: string;
    message: string;
    abstract validate(value:any, options?:IValidatorOptions):boolean;
    error(errCode: any, errmsg: string, options:IValidatorOptions):void {
        // throw error out of valiator, apply to component and display on dom
        const configErrorMessage = options ? (options.errmsg || []) : [];
        let message = errmsg;
        for(const msg of configErrorMessage) {
            if(msg.errorCode === errCode) {
                message = msg.message;
                break;
            }
        }
        this.message = message;
        this.errCode = errCode;
    }
}
