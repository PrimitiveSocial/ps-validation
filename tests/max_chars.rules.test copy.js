import {max_chars} from "../src/utils/Rules";

let arg = 5;

test('max_chars rule passes with string length lesser than the max', () => {
    expect(max_chars('hello', arg)).toBe(true);
});

test('max_chars rule fails with string length greater than the max', () => {
    expect(max_chars('hello world!', arg)).toBe(false);
});

test('max_chars rule passes with number as string', () => {
    expect(max_chars('12345', arg)).toBe(true);
});

test('max_chars rule fails with number as string', () => {
    expect(max_chars('123456', arg)).toBe(false);
});

test('max_chars rule fails with array as input', () => {
    expect(max_chars([17], arg)).toBe(false);
});

test('max_chars rule fails with number as input', () => {
    expect(max_chars({}, arg)).toBe(false);
});

test('max_chars rule fails with object as input', () => {
    expect(max_chars({}, arg)).toBe(false);
});