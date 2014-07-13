var numbers_pressed = [];
var numbers_actions = [];

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function clear() {
  numbers_actions = [];
  numbers_pressed = [];
  $('#display').val('0');
}

function equal(){
  calculate_current();
}

function action_to_function(action) {
  var actions = { '+': add,
                  '-': subtract,
                  '*': multiply,
                  '/': divide
  };
  return actions[action];
}

function special_methods(action) {
  var actions = { 'cl': clear,
                  '=': equal
                };
  return actions[action]();
}

function calculate_current(){
  if (numbers_actions.length > 2) {
    var method = action_to_function(numbers_actions[1]);
    var current = method(numbers_actions[0], numbers_actions[2]);
    numbers_actions = [current];
    $('#display').val(current);
  }
}

function clear_numbers_pressed() {
  if (numbers_pressed.length > 0) {
    numbers_actions.push( parseInt(numbers_pressed.join('')) );
    numbers_pressed = [];
  }
}

function push_action(action) {
  clear_numbers_pressed();

  if (action == 'cl' || action == '=') {
    special_methods(action);
  } else {
    calculate_current();
    numbers_actions.push( action );
  }
}

$( document ).ready(function() {

  $( ".number" ).on( "click", function() {
    var number = $( this ).text().trim();
    numbers_pressed.push(number);
    $('#display').val(numbers_pressed.join(''));
  });

  $( ".action" ).on( "click", function() {
    var action = $( this ).text().trim();
    push_action( action );
  });

})
