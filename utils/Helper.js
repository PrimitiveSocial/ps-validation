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
 * @param value
 * @returns {boolean}
 */
export function hasArg(value) {
    return ( typeof value === 'string' && value.split(':').length > 1);
}