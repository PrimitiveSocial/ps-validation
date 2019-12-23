import {required} from "./../src/utils/Rules";

test('required rule fails with null value', () => {
    expect(required(null)).toBe(false);
});

test('required rule fails with empty string', () => {
    expect(required('')).toBe(false);
});

test('required rule passes with valid string', () => {
    expect(required('Jest')).toBe(true);
});

test('required rule passes with valid integer', () => {
    expect(required(100)).toBe(true);
});