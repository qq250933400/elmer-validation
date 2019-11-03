import { assert } from "chai";
import { UseValidation, ValidationComponent, ValidationProvider } from "../../src";

describe("UseValidation test", () => {
    const TestComponent = class {};
    before(() => {
        UseValidation({
            sectionId: "testPage"
        })(TestComponent);
    });
    describe("Inject Validation test", () => {
        const a:ValidationComponent<any> = new TestComponent();
        it("inject params test", () => {
            assert.isObject(a.validateParams);
        });
        it("Bind validate function to target test", () => {
            assert.isFunction(a.validate);
        });
        it("Bind validateByTag function to target test", () => {
            assert.isFunction(a.validateByTag);
        });
    });
    describe("Validate method call", () => {
        const a:ValidationComponent<any> = new TestComponent();
        it("registe validate test", () => {
            ValidationProvider.registe({
                sectionId: "testPage",
                validateId: "major",
                validateType: "MobileValidator"
            });
            ValidationProvider.registe({
                sectionId: "testPage",
                validateId: "emailValidate",
                validateType: "MobileValidator"
            });
        });
        it("call validate test", () => {
            a.validate("major", "13825180704");
        });
    });
});
