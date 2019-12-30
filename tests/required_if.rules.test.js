import {required_if} from "../src/utils/Rules";

let validCondition = true;

test('required_if passes if the condition is not boolean', () => {
    expect(required_if('Foo', 'Jest')).toBe(true);
});

test('required_if rule fails with empty value and valid condition', () => {
    expect(required_if(null, validCondition)).toBe(false);
});

test('required_if rule passes with valid value and valid condition', () => {
    expect(required_if('Jest', validCondition)).toBe(true);
});

test('required_if rule passes with empty value and false condition', () => {
    expect(required_if('', false)).toBe(true);
});