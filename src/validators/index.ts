import { ArrayValidator } from "./ArrayValidator";
import { ChineseValidator } from "./ChineseValidator";
import { EmailValidator } from "./EmailValidator";
import { LengthValidator } from "./LengthValidator";
import { MobileValidator } from "./MobileValidator";
import { NumericValidator } from "./NumericValidator";

export type ValidatorName = "MobileValidator" |
    "EmailValidator" |
    "ArrayValidator" |
    "NumericValidator" |
    "ChineseValidator" |
    "LengthValidator";

export default {
    ArrayValidator,
    ChineseValidator,
    EmailValidator,
    LengthValidator,
    MobileValidator,
    NumericValidator
};
