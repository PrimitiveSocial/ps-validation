import {min_chars} from "../src/utils/Rules";

let arg = 5;

test('min_chars rule passes with string length greater than the min', () => {
    expect(min_chars('hello world', arg)).toBe(true);
});

test('min_chars rule fails with string length lesser than the min', () => {
    expect(min_chars('test', arg)).toBe(false);
});

test('min_chars rule passes with number as string', () => {
    expect(min_chars('123456', arg)).toBe(true);
});

test('min_chars rule fails with number as string', () => {
    expect(min_chars('1234', arg)).toBe(false);
});

test('min_chars rule fails with array as input', () => {
    expect(min_chars([17], arg)).toBe(false);
});

test('min_chars rule fails with number as input', () => {
    expect(min_chars({}, arg)).toBe(false);
});

test('min_chars rule fails with object as input', () => {
    expect(min_chars({}, arg)).toBe(false);
});