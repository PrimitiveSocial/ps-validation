import {find, has} from "./../src/utils/Eloquent";

let data = {
	name: 'John Doe',
	event: {
		start_date: '10/20/2019',
		fee: 50,
		speaker: [
			'Taylor',
			'Adam'
		]
	},
	a: null,
	b: undefined,
	c: true,
	d: []
};

test('it finds name property in data', () => {
  expect(find(data, 'name')).toBe('John Doe');
});

test('it finds and returns null values', () => {
	expect(find(data, 'a')).toBe(null);
});

test('it finds and returns undefined values', () => {
	expect(find(data, 'b')).toBe(undefined);
});

test('it finds and returns bool values', () => {
	expect(find(data, 'c')).toBe(true);
});

test('it does not find invalid path', () => {
	expect(find(data, 'x.y.z')).toBe('Could not find "x.y.z" in the object.');
});

test('it supports finding properties by dot annotations', () => {
  expect(find(data, 'event.start_date')).toBe('10/20/2019');
});

test('it supports finding properties by dot annotations with array indexes', () => {
  expect(find(data, 'event.speaker.0')).toBe('Taylor');
  expect(find(data, 'event.speaker.1')).toBe('Adam');
});

test('it returns default message when not found', () => {
  expect(find(data, 'foo')).toBe('Could not find "foo" in the object.');
});

test('it returns default message when not finding a nested property', () => {
	expect(find(data, 'event.test')).toBe('Could not find "event.test" in the object.');
});

test('it returns default message with undefined', () => {
	expect(find(undefined, 'foo')).toBe('Could not find "foo" in the object.');
});

test('it returns default message with array', () => {
	expect(find([], 'foo')).toBe('Could not find "foo" in the object.');
});

test('it returns default message with string', () => {
	expect(find('foo', 'foo')).toBe('Could not find "foo" in the object.');
});

test('it checks if a property exists in data', () => {
  expect(has(data, 'name')).toBe(true);
});

test('it checks if a property does not exist in data', () => {
  expect(has(data, 'foo')).toBe(false);
});

test('it checks if a nested property does not exist in data', () => {
	expect(has(data, 'event.test')).toBe(false);
});

test('it supports checking property names by dot annotations', () => {
  expect(has(data, 'event.fee')).toBe(true);
});

test('it returns false with undefined', () => {
	expect(has(undefined, 'foo')).toBe(false);
});

test('it returns false with array', () => {
	expect(has([], 'foo')).toBe(false);
});

test('it returns false with string', () => {
	expect(has('foo', 'foo')).toBe(false);
});