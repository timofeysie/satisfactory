# using ngModel on the same form field as formControlName

forms.js:1468

It looks like you're using ngModel on the same form field as formControlName.
Support for using the ngModel input property and ngModelChange event with
reactive form directives has been deprecated in Angular v6 and will be removed
in a future version of Angular.

For more information on this, see our API docs here:
https://angular.io/api/forms/FormControlName#use-with-ngmodel

It would be nice if it mentioned what file the issue was in, but in this case it was pretty easy to figure out by looking for ngModel and seeing where the fields also had formControlName.  The file in question has

libs\trends\src\lib\components\post-creation-form\post-creation-form.component.html