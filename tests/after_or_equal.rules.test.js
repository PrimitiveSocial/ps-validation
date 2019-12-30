import {after_or_equal} from "../src/utils/Rules";

let comparisonDate = '10/31/2019';
let currentDate = '11/20/2019';

test('after_or_equal rule passes with a valid condition', () => {
    expect(after_or_equal(currentDate, comparisonDate)).toBe(true);
});

let pastDate = '11/20/2018';
test('after_or_equal rule fails with an invalid condition', () => {
    expect(after_or_equal(pastDate, comparisonDate)).toBe(false);
});

test('after_or_equal rule fails with invalid date', () => {
    expect(after_or_equal('15/15/15', comparisonDate)).toBe(false);
});

test('after_or_equal rule fails with number', () => {
    expect(after_or_equal(15, comparisonDate)).toBe(false);
});

test('after_or_equal rule fails array', () => {
    expect(after_or_equal(['11/20/2019'], comparisonDate)).toBe(false);
});

test('after_or_equal rule fails object', () => {
    expect(after_or_equal({d: '11/20/2019'}, comparisonDate)).toBe(false);
});