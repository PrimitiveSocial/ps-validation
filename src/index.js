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
                // renders the validator error (by model).
                $error: function(model) {
                    return (this.validator) ? this.validator.renderError(model) : null;
                }
            },
            computed: {
                // returns the data() object from the component without the validator property.
                $all: function() {
                    let _data = this.$data;
                    let result = {};

                    Object.keys(_data).forEach(key => {
                        if(key !== 'validator')
                            result[key] = _data[key];
                    });

                    return result;
                }
            },
            mounted() {
                let sfc = this;
                this.validator = new Validator(sfc);
            }
        });
    }
};

export default PsValidation;
