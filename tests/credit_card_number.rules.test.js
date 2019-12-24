import {credit_card_number} from "./../src/utils/Rules";

test('credit_card_number rule fails with null number', () => {
    expect(credit_card_number(null, 'Visa')).toBe(false);
});

test('credit_card_number rule fails with a number that is not lunh10', () => {
    expect(credit_card_number('1111111111111111', 'Visa')).toBe(false);
});

test('credit_card_number rule fails with an invalid card type', () => {
    expect(credit_card_number('4242424242424242', 'Foo')).toBe(false);
});

test('credit_card_number rule fails with invalid number of digits', () => {
    expect(credit_card_number('424242424242', 'Visa')).toBe(false);
});

test('credit_card_number rule fails with an invalid prefix for card type', () => {
    expect(credit_card_number('5242424242424242', 'Visa')).toBe(false);
});

test('credit_card_number of type Visa fails with MasterCard set', () => {
    expect(credit_card_number('4242424242424242', 'MasterCard')).toBe(false);
});

test('credit_card_number of type Visa is valid', () => {
    expect(credit_card_number('4242424242424242', 'Visa')).toBe(true);
});

test('credit_card_number of type MasterCard is valid', () => {
    expect(credit_card_number('5555555555554444', 'MasterCard')).toBe(true);
});

test('credit_card_number supports dashes', () => {
    expect(credit_card_number('5555-5555-5555-4444', 'MasterCard')).toBe(true);
});

test('credit_card_number supports spaces', () => {
    expect(credit_card_number('5555 5555 5555 4444', 'MasterCard')).toBe(true);
});