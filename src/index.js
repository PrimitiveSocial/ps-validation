import {Validator} from "./Classes/Validator";

const PsValidation = {
    install: function(Vue, options = {}) {
        Vue.mixin({
            data() {
                return {
                    validator: null
                }
            },
            methods: {
                // initialize the validator
                $initValidator: function() {
                    let sfc = this;
                    this.validator = new Validator(sfc);
                },
                // renders the validator error (by model).
                $error: function(model) {
                    return (this.validator) ? this.validator.renderError(model) : null;
                }
            },
            mounted() {
                //this.$initValidator();
            }
        });
    }
};

export default PsValidation;
