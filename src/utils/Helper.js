/**
 * Check if the value is a javascript object.
 *
 * @param value
 * @returns {boolean}
 */
export function isObject(value) {
    let type = typeof value;
    return value !== null && (type === 'object' || type === 'function');
}

/**
 * Check if a value is a string with the format: rule:arg
 *
 * @param value
 * @returns {boolean}
 */
export function hasArg(value) {
    return ( typeof value === 'string' && value.split(':').length > 1);
}

/**
 * Validate a variety of identification numbers, such as credit card numbers, IMEI numbers, National Provider Identifier numbers
 *
 * https://en.wikipedia.org/wiki/Luhn_algorithm
 * @param identifier
 * @returns {boolean}
 */
export function luhn10(identifier) {
    if(!identifier || !identifier.length)
        return false;

    // Check that the number is numeric
    let cardExp = /^[0-9]{13,19}$/;
    if (!cardExp.exec(identifier))  {
        return false;
    }

    let sum = 0;
    let alt = false;
    let i = identifier.length - 1;
    let num;

    while (i >= 0) {
        num = parseInt(identifier.charAt(i), 10);

        if (alt) {
            num *= 2;
            if (num > 9) {
                num = (num % 10) + 1; // eslint-disable-line no-extra-parens
            }
        }

        alt = !alt;

        sum += num;

        i--;
    }

    return sum % 10 === 0;
};

export const Str = (str) => {
    return {
        // Determines if a string begins with the given string
        starts_with(value) {
            return str.indexOf(value) === 0;
        }
    }
}
