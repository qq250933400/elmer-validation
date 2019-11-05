import ValidatorRules,{ ValidatorName } from "./validators";

export type ValidatorNames = ValidatorName;

export * from "./core/ValidationProvider";
export * from "./core/UseValidation";
export * from "./core/Validator";
export * from "./validators/ValidatorTypes";
export * from "./core/ValidationTypes";
export * from "./core/DefineValidators";

export default {
    ValidatorRules
};
