import {max} from "../src/utils/Rules";

let arg = 10;

test('max rule passes with number less than the max', () => {
    expect(max(5, arg)).toBe(true);
});

test('max rule passes with decimals less than the max', () => {
    expect(max(5.9, arg)).toBe(true);
});

test('max rule fails with number greater than the max', () => {
    expect(max(18, arg)).toBe(false);
});

test('max rule passes with string as number because of parseInt', () => {
    expect(max('7', arg)).toBe(true);
});

test('max rule fails with array as number', () => {
    expect(max([1], arg)).toBe(false);
});

test('max rule fails with object as number', () => {
    expect(max({}, arg)).toBe(false);
});