import {isObject} from "./Helper";

const disallowedKeys = [
    '__proto__',
    'prototype',
    'constructor'
];

const isValidPath = pathSegments => !pathSegments.some(segment => disallowedKeys.includes(segment));

/**
 * Get the path segments split by '.'
 * @param path
 * @returns {[]|Array}
 */
function getPathSegments(path) {
    const pathArray = path.split('.');
    const parts = [];

    for (let i = 0; i < pathArray.length; i++) {
        let p = pathArray[i];

        while (p[p.length - 1] === '\\' && pathArray[i + 1] !== undefined) {
            p = p.slice(0, -1) + '.';
            p += pathArray[++i];
        }

        parts.push(p);
    }

    if (!isValidPath(parts)) {
        return [];
    }

    return parts;
}

/**
 * Returns the value of a given path in an object.
 * Supports nested dot annotations.
 *
 * @example find(data, 'notice.event')
 *
 * @param object
 * @param path
 * @param value
 * @returns {string|*}
 */
export function find(object, path, value) {
    value = 'Could not find "' + path + '" in the object.';
    if (!isObject(object) || typeof path !== 'string') {
        return value === undefined ? object : value;
    }

    let pathArray = getPathSegments(path);
    if (pathArray.length === 0) {
        return;
    }

    for (let i = 0; i < pathArray.length; i++) {
        if (!Object.prototype.propertyIsEnumerable.call(object, pathArray[i])) {
            return value;
        }

        object = object[pathArray[i]];

        if (object === undefined || object === null) {
            if (i !== pathArray.length - 1) {
                return value;
            }

            break;
        }
    }

    return object;
}

/**
 * Check if a path exists in a given object.
 *
 * @example has(data, 'notice.event')
 *
 * @param object
 * @param path
 * @returns {boolean}
 */
export function has(object, path) {
    if (!isObject(object) || typeof path !== 'string') {
        return false;
    }

    const pathArray = getPathSegments(path);
    if (pathArray.length === 0) {
        return false;
    }

    for (let i = 0; i < pathArray.length; i++) {
        if (isObject(object)) {
            if (!(pathArray[i] in object)) {
                return false;
            }

            object = object[pathArray[i]];
        } else {
            return false;
        }
    }

    return true;
}
