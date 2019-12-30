import {credit_card_cvv, credit_card_number} from "../src/utils/Rules";

let cvv = 852;

test('credit_card_cvv rule passes with valid number', () => {
    expect(credit_card_cvv(cvv)).toBe(true);
});

test('credit_card_cvv rule fails with null', () => {
    expect(credit_card_cvv(null)).toBe(false);
});

test('credit_card_cvv rule fails invalid number', () => {
    expect(credit_card_cvv(12345)).toBe(false);
});