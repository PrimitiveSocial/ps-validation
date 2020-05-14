import {warn} from "./Console";
import {CreditCard} from "./../Classes/CreditCard";

export function required(value, arg = null)  {
    return (value !== '' && value !== null && typeof value !== 'undefined');
}

export function integer (value, arg = null) {
    return Number.isInteger(parseInt(value));
}

export function string (value, arg = null) {
    return typeof value === 'string';
}

export function email (value, arg = null) {
    let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(value)
}

export function min (value, arg) {
    if(typeof value === 'object')
        return false;

    return parseInt(value) >= parseInt(arg);
}

export function max (value, arg) {
    if(typeof value === 'object')
        return false;

    return parseInt(value) <= parseInt(arg);
}

export function min_chars (value, arg) {
    if(typeof value !== 'string')
        return false;

    return value.length >= parseInt(arg);
}

export function max_chars (value, arg) {
    if(typeof value !== 'string')
        return false;

    return value.length <= parseInt(arg);
}

export function date (value, arg = null) {
    let date = new Date(value);
    return !isNaN(date.getFullYear()) && !isNaN(date.getMonth()) && !isNaN(date.getDate()) && date.toDateString() !== 'Invalid Date';
}

export function before_or_equal (value, arg) {
    if(typeof value === 'object' || typeof arg === 'object' || typeof value === 'number' || typeof arg === 'number')
        return false;

    let originalDate = new Date(value);
    let comparingDate = new Date(arg);
    return originalDate.getTime() <= comparingDate.getTime();
}

export function after_or_equal (value, arg) {
    if(typeof value === 'object' || typeof arg === 'object' || typeof value === 'number' || typeof arg === 'number')
        return false;

    let originalDate = new Date(value);
    let comparingDate = new Date(arg);
    return originalDate.getTime() >= comparingDate.getTime();
}

export function required_if(value, arg) {
    if(typeof arg !== 'boolean') {
        warn('The value of required_if argument must be of type boolean.');
        warn('The required_if rule is ignored. Please fix its argument');
        return true;
    }

    return (!arg) ? true : required(value);
}

export function credit_card_number(value, arg) {
    let cc = new CreditCard(value, arg);
    return cc.isValid();
}

export function credit_card_cvv(value, arg = null) {
    let numberLength = 3;
    let regex = new RegExp(`^[0-9]{${numberLength}}$`);
    return regex.test(value);
}

export function credit_card_month(value, arg = null) {
    return parseInt(value) <= 12 && parseInt(value) > 0;
}

export function credit_card_year(value, arg = null) {
     let currentYear = new Date().getFullYear().toString().substr(-2);
     return parseInt(value) >= parseInt(currentYear);
}

export function length(value, arg) {
    return value.length === arg;
}



