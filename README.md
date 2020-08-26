![GitHub Workflow Status](https://img.shields.io/github/workflow/status/PrimitiveSocial/ps-validation/NodeCI)
[![CodeFactor](https://www.codefactor.io/repository/github/primitivesocial/ps-validation/badge)](https://www.codefactor.io/repository/github/primitivesocial/ps-validation)
![downloads](https://img.shields.io/npm/dt/@primitivesocial/ps-validation)
![min-size](https://img.shields.io/bundlephobia/min/@primitivesocial/ps-validation/1.0.6)
![license](https://img.shields.io/github/license/PrimitiveSocial/ps-validation)

A Vue plugin that provides out-of-the-box data validation rules, very much inspired from Laravel validation system.

## Installation

```
npm i @primitivesocial/ps-validation
```

```js
import PsValidation from "@primitivesocial/ps-validation";
Vue.use(PsValidation);
```

## Basic Usage Example
The plugin provides a data property `validator` that creates a new instance of the validator.

In this simple example, we will demonstrate how to add a validation for `name` property before submitting the data using the method `submitData()`.

```js
// Vue SFC
export default {
   data() {
      return {
          name: '',
      }
   },
   methods: {
      submitData() {
         axios.post(url, { data: { name: name} });
      }
   }
}
```

- **First step define the validation rules needed**
```js
export default {
   data() {
      return {
         name: '',
         // here we are adding the validation rules
         validationRules: [
            { model: 'name', rules: 'required' },
         ]
      }
   }
}
```
- **Next we will setup the validator and validate our data before submitting it**
```js
   mounted() {
      this.$initValidator();
      this.validator.setRules(this.validationRules);
   },
   methods: {
      submitData() {
         this.validator.validate();
         
         if(this.validator.passes())
            axios.post(url, { data: { name: name} });

         // You can also use .fails()
         if(this.validator.fails())
            alert('Name is required');
      }
   }
```

And that's it! 🦄 🦄 🚀 🚀 

## Error rendering & Customization
The plugin provides a helper `$error` to render the error in the Vue component template.
Each rule has a default error message.
```html
<span class='error'>{{ $error('name') }}</span> 
<!-- Will display "this field is required" for the required rule. -->
```

You can customize the error message when setting up the validator.
```js
this.validator
   .setCustomMessages({
      'name.required': 'The name field must not be empty.'
   });
```
_Note: the key provided in the `setCustomMessages()` object parameter, is always set to: `data property` concatenated with `rule name`_

## Support for dot path annotations
You can validate deep nested properties inside your data object easily by adding dot path annotations.
```js
data() {
   return {
      event: {
         speaker: {
            name: '',
         }
      },
      validations: [
         {model: 'event.speaker.name', rules: 'required'}
      ]
   }
}
```
## Working With Rules
### Adding multiple rule
You can add multiple rule to the same property or model by separating them with `|`
```js
{ model: 'age', rules: 'required | integer | min:18' }
```

### Available rules
- **required** _The field under validation must be present in the input data and not empty_
- **integer** _The field under validation must be an integer_
- **email** _The field under validation must be a valid email_
- **string** _The field under validation must be an string_
- **date** _The field under validation must be a date_
- **min:value** _The field under validation must have a minimum value. Numbers are only evaluated for now_
- **max:value** _The field under validation must have a maximum value. Numbers are only evaluated for now_
- **before_or_equal:date** _The field under validation must be a value preceding or equal to the given date_
- **after_or_equal:date** _The field under validation must be a value after or equal to the given date_
- **required_if:boolean** _The field under validation must be present and not empty if the boolean condition is true_
- **credit_card_number:cardType** _The field under validation must be a valid credit card number of the specified type_
- **credit_card_cvv** _The field under validation must be a valid credit card cvv_

*Available credit card types for validation: `Visa, MasterCard, Amex, VisaElectron`

```js
// example of combined rules 
data() {
   person: {
      is_student: false,
      age: null,
      registered_at: null,
   },
   card: {
      number: null,
      cvv: null,
      type: 'Visa'
   },
   registration_ends: '10/31/2020',
   validations: [
      // age will be required only if is_student is true
      { model: 'person.age', rules: 'required_if:person.is_student | integer | min:18' } ,
      // registered_at will be required, must be a date and before or equal to registration_ends date
      { model: 'person.registered_at', rules: 'required | date | before_or_equal:registration_ends' },
      // credit card number and cvv validation
      { model: 'card.number', rules: 'credit_card_number:card.type' },
      { model: 'card.cvv', rules: 'credit_card_cvv' }, 
   ]
}
```

## Adding Custom rule
You can easily extend the validator by adding a custom rule using the method `extend(ruleName, function, errorMessage)`

```js
mounted() {
   this.validator.extend(
      'alpha_dash',
      function(value, arg) {
         let regexp = /^[a-z_]+$/i;
         return !!regexp.test(value);
      },
      'this field must contain only letters as well as underscores.'
   );
},
data() {
   return {
      username: '',
      validations: [
         { model: 'username', rules: 'string | alpha_dash' }
      ]
   }
}
```

## Developer friendly
Along with the jest tests, the plugin provides helpful warning messages in the browser console in case something is missed by the developer.
Here are few examples:

When you try to validate without setting the rules to the validator
```
PsValidation debugger: You must specify the validation rules.
```

Or when you add a rule that doesn't exist or not defined.
```
PsValidation debugger: The rule wtv for the model noticeEvent.notifyDate is not defined. It will be ignored.
```

## Author & Contribution
Hey, I'm Elie Andraos, a web developer at [Primitive Social](https://twitter.com/PrimitiveSocial).
Pull requests are always welcome. For major changes, please open an issue first to discuss what you would like to change.
You can also [reach me out on twitter](https://twitter.com/andzilla31) for any question! 
