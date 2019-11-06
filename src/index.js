import {Validator} from "./Classes/Validator";

const PsValidation = {
    install: function(Vue, options = {}) {
        Vue.mixin({
            data() {
                return {
                    validator: new Validator()
                }
            },
            methods: {
                // renders the validator error (by model).
                $error: function(model) {
                    return this.validator.renderError(model);
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
            }
        });
    }
};

export default PsValidation;
