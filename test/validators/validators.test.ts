import { assert } from "chai";
import { LengthValidatorOptions } from "../../src";
import validators from "../../src/validators";

describe("Validators test", () => {
    describe("EmailValidator test", () => {
        const obj = new validators.EmailValidator();
        it("validate function check", () => {
            assert.isFunction(obj.validate);
        });
        it("validate check fail result, example: 250933400@aaaa", () => {
            assert.equal(obj.validate("250933400@aaaa"), false);
        });
        it("validate check success result, example: 250933400@qq.com", () => {
            assert.equal(obj.validate("250933400@qq.com"), true);
        });
    });
    describe("MobileValidator test", () => {
        const obj = new validators.MobileValidator();
        it("validate function check", () => {
            assert.isFunction(obj.validate);
        });
        it("validate check fail result, example: 1382555", () => {
            assert.equal(obj.validate("1382555"), false);
        });
        it("validate check success result, example: 13825222222", () => {
            assert.equal(obj.validate("13825222222"), true);
        });
        it("required check", () => {
            assert.equal(obj.validate(null, {
                isRequired: true
            }), false);
            assert.equal(obj.validate("13825222222", {
                isRequired: true
            }), true);
        });
    });
    describe("ArrayValidator test", () => {
        const obj = new validators.ArrayValidator();
        it("validate function check", () => {
            assert.isFunction(obj.validate);
        });
        it("validate check fail result, example: asss", () => {
            assert.equal(obj.validate("asss"), false);
        });
        it("validate check success result, example: [250933400@qq.com]", () => {
            assert.equal(obj.validate(["250933400@qq.com"]), true);
        });
    });
    describe("NumericValidator test", () => {
        const obj = new validators.NumericValidator();
        it("validate function check", () => {
            assert.isFunction(obj.validate);
        });
        it("validate check fail result,example: 00.3265.665", () => {
            assert.equal(obj.validate("00.3265.665"), false);
        });
        it("validate check success result, example: 00.332", () => {
            assert.equal(obj.validate("00.332"), true);
        });
    });
    describe("ChineseValidator test", () => {
        const obj = new validators.ChineseValidator();
        it("validate function check", () => {
            assert.isFunction(obj.validate);
        });
        it("validate check fail result,example: 中文测试112", () => {
            assert.equal(obj.validate("中文测试112"), false);
        });
        it("validate check success result, example: 00.332", () => {
            assert.equal(obj.validate("中文测试"), true);
        });
    });
    describe("LengthValidator test", () => {
        const obj = new validators.LengthValidator();
        it("validate function check", () => {
            assert.isFunction(obj.validate);
        });
        it("validate check fail result,minLength=10,example: 中文测试", () => {
            assert.equal(obj.validate<LengthValidatorOptions>("中文测试", {minLength: 10 }), false);
        });
        it("validate check fail result,maxLength=10,example: 中文测试中文测试", () => {
            assert.equal(obj.validate<LengthValidatorOptions>("中文测试中文测试", {maxLength: 10 }), false);
        });
        it("validate check fail result,minLength=5,maxLength=10, example: 中文测试测试", () => {
            assert.equal(obj.validate<LengthValidatorOptions>("中文测试测试", {minLength: 5, maxLength: 10 }), false);
        });
        it("validate check success result,minLength=10,example: 中文测试中文测试", () => {
            assert.equal(obj.validate<LengthValidatorOptions>("中文测试中文测试", {minLength: 10 }), true);
        });
        it("validate check success result,maxLength=10,example: 中文测试中", () => {
            assert.equal(obj.validate<LengthValidatorOptions>("中文测试中", {maxLength: 10 }), true);
        });
        it("validate check success result,minLength=5,maxLength=10, example: 中文测试", () => {
            assert.equal(obj.validate<LengthValidatorOptions>("中文测试", {minLength: 5, maxLength: 10 }), true);
        });
    });
});
