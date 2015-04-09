var Validator = {
  emailRegex: /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/,
  passwordRegex: /^[a-z]+$/,
  numberRegex: /^[0-9]+$/,
  countryRegex:/[a-zA-Z]{2,}/,
  confirmation: ['email', 'password'],

  validateRegexes: function(validateMethod, given){
    return this[validateMethod+'Regex'].test(given);
  },
  validateConfirmations: function($el) {
    var name = $el.attr('name')
    if(name.indexOf('confirmation') == -1) {
      return true;
    }
    var type = $el.attr('type');
    var confirmations = $('input[type=' + type + ']');
    return $(confirmations[0]).val() == $(confirmations[1]).val();
  },
  valid: function(validateMethod, $el){
    return this.validateRegexes(validateMethod, $el.val()) && this.validateConfirmations($el);
  },
  validateField: function($el){
    var validateMethod = this.validateMethod($el);
    var valid = this.valid(validateMethod, $el);
    this.validateConfirmations($el);
    this.displayErrorMessage($el, valid, validateMethod);
    return valid;
  },
  validateMethod: function($el) {
    return $el.data('validate-as') || $el.attr('type');
  },
  displayErrorMessage: function($el, valid, validateMethod) {
    var $input = $el.closest('.form-input');
    $input.toggleClass('error', !valid);
  },
  numInvalid: function($submit) {
    var inputs = $submit.closest('form').find('input').not(':input[type=submit]');
    return $.grep(inputs, function( input, index ) {
      return !Validator.validateField($(input));
    }).length;
  },
  isValidForm: function($submit) {
    var valid = this.numInvalid($submit) == 0;
    $submit.toggleClass('valid', valid);
    return valid;
  }
};

$(function() {

  $('form').focusout(function(event){
    var $target = $(event.target)
    if($target.is('input') && $target.val()){
      Validator.validateField($target);
    }
  });

  $('form').submit(function(event){
    if(Validator.isValidForm($('input[type=submit]'))){
      alert('succes!');
    } else {
      event.preventDefault();
    }
  });
});