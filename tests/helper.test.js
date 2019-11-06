import {isObject, hasArg} from "./../src/utils/Helper";

let validStr = 'required_if:hasEvent';
test('it returns true with a valid syntax', () => {
  expect(hasArg(validStr)).toBe(true);
});

let invalidStr = 'required_if|hasEvent';
test('it returns false with an invalid syntax', () => {
  expect(hasArg(invalidStr)).toBe(false);
})

let validObj = { foo: 'bar'};
test('it returns true with a valid object', () => {
  expect(isObject(validObj)).toBe(true);
});

let invalidObj = "foo:bar";
test('it returns false with an invalid object', () => {
  expect(isObject(invalidObj)).toBe(false);
});