import {min} from "../src/utils/Rules";

let arg = 10;

test('min rule passes with number greater than the min', () => {
    expect(min(15, arg)).toBe(true);
});

test('min rule passes with decimals greater than the min', () => {
    expect(min(15.9, arg)).toBe(true);
});

test('min rule fails with number less than the min', () => {
    expect(min(8, arg)).toBe(false);
});

test('min rule passes with string as number because of parseInt', () => {
    expect(min('17', arg)).toBe(true);
});

test('min rule fails with array as number', () => {
    expect(min([17], arg)).toBe(false);
});

test('min rule fails with object as number', () => {
    expect(min({}, arg)).toBe(false);
});