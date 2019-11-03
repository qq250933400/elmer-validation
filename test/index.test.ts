import { assert } from "chai";
import { ValidationProvider } from "../src";

describe("ValidationProvider test", () => {
    it("Init exists on ValidationProvider", () => {
        assert.isFunction(ValidationProvider.init, "Target is not an function");
    });
    it("getState exists on ValidationProvider", () => {
        assert.isFunction(ValidationProvider.getState, "Target is not an function");
    });
    it("override init testting", () => {
        const overrideResult = ValidationProvider.overrideInit(() => {
            (<any>global).state = {
                version: "1.0.0"
            };
        });
        assert.equal(overrideResult, true);
    });
    it("override getState testting", () => {
        const overrideResult = ValidationProvider.overrideGetState(() => {
            return (<any>global).state;
        });
        assert.equal(overrideResult, true);
    });
    it("getState result testting", () => {
        ValidationProvider.init();
        const state:any = ValidationProvider.getState();
        assert.equal(state.version, "1.0.0");
    });
});
