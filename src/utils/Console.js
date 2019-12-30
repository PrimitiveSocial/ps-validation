const warnPrefix = 'PsValidation debugger: ';

function inDevelopmentMode() {
    return (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined');
}

export function warn(message) {
    if(inDevelopmentMode()) {
        window.console.warn(warnPrefix + message);
        return true;
    }
    return false;
}

export function warnIf(condition, message) {
    if(inDevelopmentMode() && condition) {
        window.console.warn(warnPrefix + message);
        return true;
    }
    return false;
}