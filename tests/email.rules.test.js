import {email} from "../src/utils/Rules";

let validEmail = 'elie@primitivesocial.com';
test('email rule passes with valid email', () => {
    expect(email(validEmail)).toBe(true);
});

let invalidEmail = 'elie at primitivesocial dot com';
test('email rule fails with invalid email', () => {
    expect(email(invalidEmail)).toBe(false);
});

let emptyStr = '';
test('email rule fails with empty string', () => {
    expect(email(emptyStr)).toBe(false);
});

let number = 100;
test('email rule fails with numbers', () => {
    expect(email(number)).toBe(false);
});

