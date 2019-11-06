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
In this example, we will demonstrate how to add a validation for `name` and `age` data properties before submitting the data using the method `submitData()`.

```js
// Vue SFC
export default {
   data() {
      return {
         person: {
            name: '',
            age: 0,
         }
      }
   },
   methods: {
      submitData() {
         axios.post(url, {data: this.person});
      }
   }
}
```

- **First step define the validation rules needed**
```js
export default {
   data() {
      return {
         person: {
            name: '',
            age: 0,
         },
         // here we are adding the validation rules
         validations: [
            { model: 'name', rules: 'required' },
            { model: 'age', rules: 'required' }
         ]
      }
   }
}
```
- **Next we will setup the validator and validate our data before submitting it**
```js
   mounted() {
      this.validator.setRules(this.validations);
   },
   methods: {
      submitData() {
         this.validator = this.validator.setData(this.person).validate();
         if(this.validator.passes())
            axios.post(url, {data: this.person});

         // You can also use .fails()
         if(this.validator.fails())
            alert('Please fill your data');
      }
   }
```

And that's it! 🦄 🚀  

## $all helper
If you need to pass all the data to the validator (not just a chunk of it), the plugin provides a computed property to do that.
```js
this.validator.setData($all).validate();
````

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
      'age.required': 'The person age must not be left empty.'
   });
```
_Note: the key provided in the `setCustomMessages()` object parameter, is always set to: `data property` concatenated with `rule name`_

## Working With Rules

### Support for dot annotations
You can validate deep nested properties inside your data object easily by adding dot annotations.
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
### Adding multiple rule
You can add multiple rule to the same property or model by separating them with `|`
```js
{ model: 'age', rules: 'required | integer | min:18' }
```

### Available rules
- **required** The field under validation must be present in the input data and not empty
- **integer** The field under validation must be an integer
- **email** The field under validation must be a valid email
- **string** The field under validation must be an integer
- **date** The field under validation must be a date
- **min:value** The field under validation must have a minimum value. Numbers are only evaluated for now
- **max:value** The field under validation must have a maximum value. Numbers are only evaluated for now 
- **before_or_equal:date** The field under validation must be a value preceding or equal to the given date
- **before_or_equal:date** The field under validation must be a value after or equal to the given date
- **required_if:boolean** The field under validation must be present and not empty if the boolean condition is true

```js
// example of required_if rule
data() {
   person: {
      is_student: false,
      age: null
   },
   validations: [
      {model: 'age', rules: 'requiredIf:is_student | integer | min:18'} // age will be required only if is_student is true
   ]
}
```