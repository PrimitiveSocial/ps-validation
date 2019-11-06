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
	}
};

test('it finds name property in data', () => {
  expect(find(data, 'name')).toBe('John Doe');
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

test('it checks if a property exists in data', () => {
  expect(has(data, 'name')).toBe(true);
});

test('it checks if a property does not exist in data', () => {
  expect(has(data, 'foo')).toBe(false);
});

test('it supports checking property names by dot annotations', () => {
  expect(has(data, 'event.fee')).toBe(true);
});