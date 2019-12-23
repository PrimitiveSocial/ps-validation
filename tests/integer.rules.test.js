import {integer} from "./../src/utils/Rules";

test('integer rule fails with null value', () => {
    expect(integer(null)).toBe(false);
});

test('integer rule fails with valid string', () => {
    expect(integer('Jest')).toBe(false);
});

test('integer rule fails with valid array', () => {
    expect(integer([])).toBe(false);
});

test('integer rule fails with valid object', () => {
    expect(integer({})).toBe(false);
});

test('integer rule passes with valid integer', () => {
    expect(integer(10)).toBe(true);
});

test('integer rule passes with valid decimal', () => {
    expect(integer(10.5)).toBe(true);
});