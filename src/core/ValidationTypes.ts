import { ValidatorName } from "../validators";
import { IValidatorOptions, Validator } from "./Validator";

export type ValidateParamsRules = {
    name: string;
    rule: Validator
};

export type ValidateParams = {
    sectionId: string,
    validators?: ValidateParamsRules[]
};

export type ValidateCallback<T> = (validateId: string, value:any, options?: T & IValidatorOptions) => {};

export type ValidateByTagCallback<T> = (sectionName: string, tagNames: string[], options?: T & IValidatorOptions) => {};

export type ValidateContext<T> = {
    dataKey?: string;
    tagName?: string;
    validateType: T | ValidatorName;
};

export type ValidationState = {
    validators: any;
    context: any; // save all the registed validate
};

export type ValidateRegisteOptions<T> = ValidateContext<T> & {
    sectionId: string;
    validateId: string;
};

export type ValidateErrorOptions = {
    sectionId: string;
    validateId: string;
};

export type ValidateErrorCallBack = (errorCode: string, message: string, options:ValidateErrorOptions) => {};

export type ValidationComponent<T> = T & {
    validate: ValidateCallback<T>;
    validateByTag: ValidateByTagCallback<T>;
    onValidationError: ValidateErrorCallBack;
};
