var Math = {
  add: function(num1, num2) {
    return num1 + num2;
  },

  subtract: function(num1, num2) {
    return num1 - num2;
  },

  multiply: function(num1, num2) {
    return num1 * num2;
  },

  divide: function(num1, num2) {
    return num1 / num2;
  }
}

var Calculator = {

  numbers_pressed: [],
  numbers_actions: [],
  display: 0,

  clear: function() {
    Calculator.numbers_actions = [];
    Calculator.numbers_pressed = [];
    Calculator.display = 0;
  },

  equal: function(){
    Calculator.calculate_current();
  },

  action_to_function: function(action) {
    var actions = { '+': Math.add,
                    '-': Math.subtract,
                    '*': Math.multiply,
                    '/': Math.divide
    };
    return actions[action];
  },

  special_methods: function(action) {
    var actions = { 'cl': Calculator.clear,
                    '=': Calculator.equal
                  };
    return actions[action]();
  },

  calculate_current: function(){
    if (Calculator.numbers_actions.length > 2) {
      var action = Calculator.numbers_actions[1];
      var num1 = Calculator.numbers_actions[0];
      var num2 = Calculator.numbers_actions[2];

      var method = Calculator.action_to_function(action);
      var current = method(num1, num2);
      Calculator.numbers_actions = [current];
      Calculator.display = current;
    }
  },

  clear_numbers_pressed: function() {
    if (Calculator.numbers_pressed.length > 0) {
      var full_number = parseInt(Calculator.numbers_pressed.join(''));
      Calculator.numbers_actions.push( full_number );
      Calculator.numbers_pressed = [];
    }
  },

  push_action: function(action) {
    Calculator.clear_numbers_pressed();

    if (action == 'cl' || action == '=') {
      Calculator.special_methods(action);
    } else {
      Calculator.calculate_current();
      Calculator.numbers_actions.push( action );
    }
    return Calculator.display;
  },

  push_number: function(number) {
    Calculator.numbers_pressed.push(number);
    Calculator.display = Calculator.numbers_pressed.join('');
    return Calculator.display;
  }
}

$( document ).ready(function() {

  $( ".number" ).on( "click", function() {
    var number = $( this ).text().trim();
    $('#display').val(Calculator.push_number(number));
  });

  $( ".action" ).on( "click", function() {
    var action = $( this ).text().trim();
    $('#display').val(Calculator.push_action( action ));
  });

})
