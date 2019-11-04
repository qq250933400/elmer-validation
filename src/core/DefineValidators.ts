import { ValidationProvider } from "./ValidationProvider";
import { ValidateParamsRules,ValidationState } from "./ValidationTypes";

export const DefineValidators = (rules:ValidateParamsRules[]) => {
    if(rules) {
        const state:ValidationState = ValidationProvider.getState();
        if(state) {
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
        } else {
            ValidationProvider.handleError(this, "V-ERR-UNDEFINE-STATE", "Undefined Validation State,Please run ValidationProvider.init method first.");
        }
    }
};
