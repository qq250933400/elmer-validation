import { ValidationProvider } from "./ValidationProvider";
import { ValidateParams } from "./ValidationTypes";

export const UseValidation = (params:ValidateParams) => {
    return (target:any) => {
        const targetObj = target.prototype || target;
        Object.defineProperty(targetObj, "validateParams", {
            configurable: false,
            enumerable: false,
            // tslint:disable-next-line:object-literal-sort-keys
            get:():ValidateParams=> {
                return params;
            },
            set: () => {
                throw new Error("The property [validateParams] can not be override.");
            }
        });
        ValidationProvider.bindValidateMethod(targetObj, params);
    };
};
