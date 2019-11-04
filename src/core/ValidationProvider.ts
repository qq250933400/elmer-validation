import { Common } from "elmer-common";
import Validators, { ValidatorName } from "../validators";
import {
    ValidateByTagCallback,
    ValidateCallback,
    ValidateContext,
    ValidateErrorOptions,
    ValidateParams,
    ValidateParamsRules,
    ValidateRegisteOptions,
    ValidationState
} from "./ValidationTypes";
import { IValidatorOptions, Validator } from "./Validator";

export class ValidationProvider extends Common {
    static init = () => {
        throw new Error("Please use override method to set data saving location");
    }
    static getState = () => {
        throw new Error("Please use override method to set getStore");
    }
    static isEmpty = (val:any) => {
        return val === undefined || val === null || (Object.prototype.toString.call(val) === "[object String]" && val.length === 0);
    }
    static overrideInit = (fn:Function): boolean => {
        Object.defineProperty(ValidationProvider, "init", {
            configurable: false,
            enumerable: false,
            value: fn,
            writable: false
        });
        return true;
    }
    static overrideGetState = (fn:Function): boolean => {
        Object.defineProperty(ValidationProvider, "getState", {
            configurable: false,
            enumerable: false,
            value: fn,
            writable: false
        });
        return true;
    }
    static bindValidateMethod = (target:any, params: ValidateParams): void => {
        const rules = params.validators || [];
        const state:ValidationState = ValidationProvider.getState(); // get validation global state;
        if(state) {
            if(!state.validators) {
                Object.defineProperty(state, "validators", {
                    configurable: false,
                    enumerable: false,
                    value: {},
                    writable: false
                });
            }
            if(!state.context) {
                Object.defineProperty(state, "context", {
                    configurable: false,
                    enumerable: false,
                    value: {},
                    writable: false
                });
            }
            if(!ValidationProvider.isEmpty(params.sectionId) && !state.context[params.sectionId]) {
                Object.defineProperty(state.context, params.sectionId, {
                    configurable: false,
                    enumerable: false,
                    value: {},
                    writable: false
                });
            }
            rules.map((validatorRule:ValidateParamsRules) => {
                if(!state.validators[validatorRule.name]) {
                    if(typeof validatorRule.rule === "function") {
                        Object.defineProperty(state.validators, validatorRule.name, {
                            configurable: false,
                            enumerable: false,
                            value: validatorRule.rule,
                            writable: false
                        });
                    } else {
                        ValidationProvider.handleError(self, "V-ERR-RULE-EXISTS", `The validator rule ${validatorRule.name} is not a function`);
                    }
                }
            });
            Object.defineProperty(target, "validate", {
                configurable: false,
                enumerable: false,
                value: ValidationProvider.doValidateById,
                writable: false
            });
            Object.defineProperty(target, "validateByTag", {
                configurable: false,
                enumerable: false,
                value: ValidationProvider.doValidateByTag,
                writable: false
            });
            Object.defineProperty(target, "unRegiste", {
                configurable: false,
                enumerable: false,
                value: ValidationProvider.doUnRegiste,
                writable: false
            });
        } else {
            throw new Error("UseValidation initialization failed, Please do ValidationProvider.init first");
        }
    }
    // tslint:disable-next-line:typedef
    static doValidateById = function(validateId: string, value:any, options?: IValidatorOptions):boolean {
        const params:ValidateParams = this.validateParams;
        const sectionId = params.sectionId;
        const state:ValidationState = ValidationProvider.getState();
        if(state) {
            const errOptions:ValidateErrorOptions = {
                sectionId,
                validateId
            };
            const context = state.context || {};
            const sectionContext:any = context[sectionId] || {};
            const validatorContext: ValidateContext<any> = sectionContext[validateId];
            const defineValidators = state.validators || {};
            if(validatorContext) {
                const validateKey = validatorContext.validateType;
                const ValidateClass = defineValidators[validateKey] || Validators[validateKey];
                if(options && options.isRequired) {
                    if(value === undefined || value === null) {
                        ValidationProvider.handleError(this, "VD-REQUIRE-001", "Required item cannot be empty.", errOptions);
                        return false;
                    }
                }
                if(typeof ValidateClass === "function") {
                    let validateObj:Validator = new ValidateClass();
                    if(validateObj.validate(value, options)) {
                        validateObj = null;
                        return true;
                    } else {
                        ValidationProvider.handleError(this, validateObj.errCode, validateObj.message, errOptions);
                        validateObj = null;
                        return false;
                    }
                } else {
                    ValidationProvider.handleError(this, "VD-RULE-405", "The validate action is not a function", errOptions);
                    return false;
                }
            } else {
                ValidationProvider.handleError(this, "VD-RULE-404", "The validate action has not registed, Please do registe this validate first", errOptions);
                return false;
            }
        } else {
            throw new Error("UseValidation initialization failed, Please do ValidationProvider.init first");
        }
    };
    // tslint:disable-next-line:typedef only-arrow-functions
    static doValidateByTag = function(sectionName: string, tagNames: string[], options?: IValidatorOptions) {
        const state:ValidationState = ValidationProvider.getState() || {validators: {}, context: {}};
        const context:any = state.context;
        if(context[sectionName]) {
            const validateData:any = context[sectionName] || {};
            // tslint:disable-next-line:forin
            for(const key in validateData) {
                const tmpValidate:ValidateContext<any> = validateData[key];
                const dataKey = tmpValidate.dataKey;
                const tmpTagName = tmpValidate.tagName;
                if(tagNames.indexOf(tmpTagName) > -1) {
                    const tmpValue = typeof this.getValue === "function" ? this.getValue(dataKey) : this[dataKey];
                    if(!this.validate(key, tmpValue, options)) {
                        return false;
                    }
                }
            }
            return true;
        } else {
            ValidationProvider.handleError(this, "VD-BYTAG-001", "Invalid SectionName parameter");
            return false;
        }
    };
    // tslint:disable-next-line:typedef only-arrow-functions
    static doUnRegiste = function(sectionId: string, validateId: string) {
        const state:ValidationState = ValidationProvider.getState() || {validators: {}, context: {}};
        if(state.context && !ValidationProvider.isEmpty(sectionId)) {
            if(state.context[sectionId]) {
                if(state.context[sectionId][validateId]) {
                    delete state.context[sectionId][validateId];
                }
                if(Object.keys(state.context[sectionId]).length<=0) {
                    // delete section if no validate under the section
                    delete state.context[sectionId];
                }
            }
        }
    };
    static handleError = (target: any, errorCode: string, message: string, options?: ValidateErrorOptions) => {
        typeof target.onValidationError === "function" && target.onValidationError(errorCode, message, options);
        // tslint:disable-next-line:no-console
        console.error(["[", errorCode, "]", message].join(""));
    }
    static registe = <T>(options: ValidateRegisteOptions<T>) => {
        const state:ValidationState = ValidationProvider.getState() || {validators: {}, context: {}};
        const defineValidators = state.validators || {};
        if(ValidationProvider.isEmpty(options.sectionId) || ValidationProvider.isEmpty(options.validateId)) {
            throw new Error("The sectionId and validateId can not be an empty string");
        }
        if(!state.context[options.sectionId]) {
            throw new Error("The sectionId is not exists, please use the value that defined by UseValidation");
        }
        if(defineValidators[options.validateType] || (<any>Validators)[options.validateType]) {
            if(!state.context[options.sectionId][options.validateId]) {
                Object.defineProperty(state.context[options.sectionId], options.validateId, {
                    configurable: false,
                    enumerable: false,
                    value: <ValidateContext<any>>{
                        dataKey: options.dataKey,
                        tagName: options.tagName,
                        validateType: options.validateType
                    },
                    writable: false
                });
            }
        } else {
            throw new Error("validateType is not a registered validation rule parameter");
        }
    }
}
