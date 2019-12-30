import {date} from "../src/utils/Rules";

let d = '10/31/2020';

test('date rule passes with a valid date', () => {
    expect(date(d)).toBe(true);
});

let invalidDate = '15/15/15'
test('date rule fails with a invalid date', () => {
    expect(date(invalidDate)).toBe(false);
});