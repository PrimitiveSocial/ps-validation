const warnPrefix = 'PsValidation debugger: ';

function inDevelopmentMode() {
    return (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined');
}

export function warn(message) {
    if(inDevelopmentMode()) {
        console.warn(warnPrefix + message);
    }
}

export function warnIf(condition, message) {
    if(inDevelopmentMode() && condition) {
        console.warn(warnPrefix + message);
        return false;
    }
    return true;
}