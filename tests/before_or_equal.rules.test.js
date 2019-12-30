import {before_or_equal} from "../src/utils/Rules";

let comparisonDate = '10/31/2019';
let currentDate = '11/20/2018';

test('before_or_equal rule passes with a valid condition', () => {
    expect(before_or_equal(currentDate, comparisonDate)).toBe(true);
});

let postDate = '11/20/2020';
test('before_or_equal rule fails with an invalid condition', () => {
    expect(before_or_equal(postDate, comparisonDate)).toBe(false);
});

test('before_or_equal rule fails with invalid date', () => {
    expect(before_or_equal('15/15/15', comparisonDate)).toBe(false);
});

test('before_or_equal rule fails with number', () => {
    expect(before_or_equal(15, comparisonDate)).toBe(false);
});

test('before_or_equal rule fails array', () => {
    expect(before_or_equal(['11/20/2019'], comparisonDate)).toBe(false);
});

test('before_or_equal rule fails object', () => {
    expect(before_or_equal({d: '11/20/2019'}, comparisonDate)).toBe(false);
});