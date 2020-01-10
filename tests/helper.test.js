import {isObject, hasArg, Str} from "./../src/utils/Helper";

let validStr = 'required_if:hasEvent';
test('it returns true with a valid syntax', () => {
  expect(hasArg(validStr)).toBe(true);
});

let invalidStr = 'required_if|hasEvent';
test('it returns false with an invalid syntax', () => {
  expect(hasArg(invalidStr)).toBe(false);
});

let validObj = { foo: 'bar'};
test('it returns true with a valid object', () => {
  expect(isObject(validObj)).toBe(true);
});

let nullObj = null;
test('it returns false with null', () => {
  expect(isObject(nullObj)).toBe(false);
});

let invalidObj = "foo:bar";
test('it returns false with an invalid object', () => {
  expect(isObject(invalidObj)).toBe(false);
});

let validStartsWith = "validation";
test('Str starts_with is correct', () => {
  expect(Str(validStartsWith).starts_with('va')).toBe(true);
});

let invalidStartsWith = "validation";
test('Str starts_with is incorrect', () => {
  expect(Str(invalidStartsWith).starts_with('inva')).toBe(false);
});