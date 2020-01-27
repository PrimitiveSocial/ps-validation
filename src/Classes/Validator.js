import {find} from "../utils/Eloquent";
import {hasArg} from "../utils/Helper";
import * as definedRules from "../utils/Rules";
import {warnIf, warn} from "../utils/Console";

export class Validator {
    componentInstance;
    rules;
    errorsBag;
    isValid;
    availableRules;
    rulesWithModelRelatedArguments;
    messages;
    customMessages;

    constructor(componentInstance) {
        this.componentInstance = componentInstance;
        this.rules = null;
        this.errorsBag = [];
        this.isValid = true;
        this.availableRules = [
            'required',
            'integer',
            'email',
            'min',
            'max',
            'string',
            'required_if',
            'date',
            'before_or_equal',
            'after_or_equal',
            'credit_card_number',
            'credit_card_cvv',
            'credit_card_month',
            'credit_card_year',
            'length'
        ];
        this.rulesWithModelRelatedArguments = [
            'before_or_equal',
            'after_or_equal',
            'required_if',
            'credit_card_number',
            'credit_card_cvv',
            'length'
        ];
        this.messages = this.getDefaultErrorMessages();
        this.customMessages = {};

    }

    setRules(_rules) {
        // TODO: validate the rules api is correct
        this.rules = _rules;
        return this;
    }

    setCustomMessages(_customMessages) {
        warnIf(typeof _customMessages !== 'object', 'The validator customMessages must be an object');
        this.customMessages = _customMessages;
        return this;
    }

    getRules() {
        return this.rules;
    }

    getData() {
        let _data = this.componentInstance.$data;
        let result = {};

        Object.keys(_data).forEach(key => {
            if(key !== 'validator')
                result[key] = _data[key];
        });

        return result;
    }

    getDefaultErrorMessages() {
        return {
            required: 'This field is required',
            integer: 'This field must be a number',
            email: 'This field must be a valid email',
            min: 'This field must not be less than {arg}',
            max: 'This field must not be greater than {arg}',
            string: 'This field must be characters',
            required_if: 'This field is required',
            date: 'This field must be a valid date',
            before_or_equal: 'This date must be before or equal to {arg}',
            after_or_equal: 'This date must be after or equal to {arg}',
            credit_card_number: 'The card number is invalid',
            credit_card_cvv: 'The card cvv is invalid',
            credit_card_month: 'The card month is invalid',
            credit_card_year: 'The card year is invalid',
            length: 'The length should be {arg}'
        };
    }

    validate() {
        let validationRules = this.getRules();
        this.errorsBag = [];
        this.isValid = true;

        warnIf(!validationRules, 'You must specify the validation rules.');

        validationRules.forEach( (item) => {
            let modelName = item.model;
            let modelValue = find(this.getData(), modelName);
            let rules = item.rules.split('|');

            // if the rules contains 'required_if' rule, ignore the other rules unless the 'required_if' condition is matched
           if(this.shouldIgnoreRequiredIfRules(rules))
               return;

            // execute the rules
            rules.forEach( (_rule) => {
                this.executeRule(_rule, modelName, modelValue);
            });
        });

         // update the error bag inside the validator of the vue component instance
        if(typeof this.componentInstance === 'object' && this.componentInstance.$data) {
            this.componentInstance.$data.validator.errorsBag = this.errorsBag;
        }

        return this;

    }

    renderError(model) {
        if(!this.errorsBag.length)
            return null;

        let errors = this.errorsBag.filter(error => error.model === model);
        return (errors.length) ? errors[0].message : null;
    }

    getErrorMessage(model, rule, arg) {
        let key = model + '.' + rule;
        let message = null;

        // get custom error message if exists
        if(this.customMessages.hasOwnProperty(key)) {
            message = this.customMessages[key];
        }
        else {
            message = this.messages[rule];
        }

        return message.replace('{arg}', arg);
    }

    addError(model, rule, errorMessage) {
        let key = model + '.' + rule;

        this.errorsBag.push({
            key: key,
            model: model,
            message: errorMessage
        });    
    }

    shouldIgnoreRequiredIfRules(rules) {
        let hasRequiredIfRule = false;
        let requiredIfRule = null;

        rules.map( (rule, key) => {
            if(rule.startsWith("required_if:")) {
                hasRequiredIfRule = true;
                requiredIfRule = rule;
            }
        });

        if(hasRequiredIfRule) {
            let str = requiredIfRule.split(':');
            let arg =  find(this.getData(), str[1].trim());
            if (!arg)
                return true;
        }
        return false;
    }

    executeRule(_rule, modelName, modelValue) {
        let rule = _rule.trim();
        let arg = null;

        if(hasArg(rule)) {
            let str = rule.split(':');
            rule = str[0].trim();
            arg = str[1].trim();

            // check rules which their argument is related to another model
            if(this.rulesWithModelRelatedArguments.includes(rule)) {
                arg = find(this.getData(), arg);
            }
        }

        // if a rule is not in the available rule, ignore it.
        if(!this.availableRules.includes(rule)) {
            warn('The rule ' + rule + ' for the model ' + modelName + ' is not defined. it will be ignored.');
            return true;
        }

        // get the rule error message
        let errorMessage = this.getErrorMessage(modelName, rule, arg);

        // call the rule method with the model value & update the error bag
        if(!definedRules[rule](modelValue,arg)) {
            this.addError(modelName, rule, errorMessage);
            this.isValid = false;
            return false;
        }

        return true;
    }

    passes() {
        return !!(this.isValid);
    }

    fails() {
        return !!(!this.isValid);
    }

    extend(ruleName, func, message) {
        let validApi =
            warnIf(!ruleName, 'Please specify a rule name as first argument for the validator extend() method')
            && warnIf(!func, 'Please specify a function as second argument for the validator extend() method')
            && warnIf(!message, 'Please specify a message as third argument for the validator extend() method')
            && warnIf(typeof ruleName !== 'string', 'The first argument must be a string in the validator extend() method')
            && warnIf(typeof func !== 'function', 'The second argument must be a function in the validator extend() method')
            && warnIf(typeof message !== 'string', 'The third argument must be a string in the validator extend() method')
            && warnIf( definedRules.hasOwnProperty(ruleName), 'The rule already exists!');

        if(!validApi)
            return;

        definedRules[ruleName] = func;
        this.availableRules.push(ruleName);
        this.messages[ruleName] = message;
    }
}