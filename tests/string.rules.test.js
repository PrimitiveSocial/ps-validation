import {string} from "../src/utils/Rules";

let validStr = 'Jest';
test('string rule passes with valid value', () => {
    expect(string(validStr)).toBe(true);
});

let nullStr = null;
test('string rule fails with null value', () => {
    expect(string(nullStr)).toBe(false);
});

let arr = [];
test('string rule fails with array', () => {
    expect(string(arr)).toBe(false);
});

let obj = {};
test('string rule fails with object', () => {
    expect(string(obj)).toBe(false);
});

let number = 12;
test('string rule fails with number', () => {
    expect(string(number)).toBe(false);
});

let emptyStr = '';
test('string rule passes with empty string', () => {
    expect(string(emptyStr)).toBe(true);
});