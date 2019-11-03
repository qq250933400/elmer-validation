import { IValidatorOptions } from "../core/Validator";

export type LengthValidatorOptions = IValidatorOptions & {
    minLength?: number;
    maxLength?: number;
};
