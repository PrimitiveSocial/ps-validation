import {warn, warnIf} from "../src/utils/Console";

test('it displays a warning', () => {
    expect(warn('custom msg')).toBe(true);
});

test('it displays a warning based on condition', () => {
    expect(warnIf(true, 'custom msg')).toBe(true);
});

test('it does not display a warning based on false condition', () => {
    expect(warnIf(false, 'custom msg')).toBe(false);
});