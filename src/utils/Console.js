const warnPrefix = 'PsValidation debugger: ';

export function warn(message) {
    if(!process.env.JEST_WORKER_ID) {
        window.console.warn(warnPrefix + message);
    }

    return true;
}

export function warnIf(condition, message) {
    if(condition) {
        if(!process.env.JEST_WORKER_ID) {
            window.console.warn(warnPrefix + message);
        }
        return true;
    }
    return false;
}