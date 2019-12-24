import {luhn10, Str} from "./../utils/Helper";

export class CreditCard {

    number;
    cardType;

    constructor(number, cardType) {
        this.cardType = cardType;
        this.number = number;

        if(this.number && this.number.length) {
            this.formatCardNumber();
        }
    }

    getCardTypes() {
        return [
            {
                name: 'Visa',
                nbDigits: [13,16],
                prefixes: [4],
            },
            {
                name: 'MasterCard',
                nbDigits: [16],
                prefixes: [51,52,53,54,55],
            },
            {
                name: 'Amex',
                nbDigits: [15],
                prefixes: [34,37],
            },
            {
                name: 'VisaElectron',
                nbDigits: [16],
                prefixes: [6304,6706,6771,6709],
            }
        ];
    }

    formatCardNumber() {
        // Remove any dashes from the credit card number
        this.number = this.number.replace(/-/g, '');
        // Remove any spaces from the credit card number
        this.number = this.number.replace (/\s/g, "");
    }

    getCard() {
        return this.getCardTypes().filter( card => {
            return card.name === this.cardType;
        }).shift();
    }

    isValid() {
        if(this.isValidCardType() && this.isValidLuhnNumber()) {
            if(!this.isValidNbDigits() || !this.isValidPrefix()) {
                return false;
            }
            // validate prefixes
            return true;
        }

        return false;
    }

    isValidCardType() {
        return !!(this.getCard());
    }

    isValidLuhnNumber() {
        return luhn10(this.number);
    }

    isValidNbDigits() {
        return this.getCard().nbDigits.includes(this.number.length);
    }

    isValidPrefix() {
        let valid = false;
        this.getCard().prefixes.forEach( prefix => {
            if(Str(this.number).starts_with(prefix))
                valid = true;
        });

        return valid;
    }

}