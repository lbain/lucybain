---
title: 'JS: Anonymous vs. referenced vs. declared functions'
tags: js, interview-questions

description: An introduction to different ways of referencing and calling functions in javascript.
keywords: javascript, js, function, anonymous, referenced, declared
---

## Anonymous

Anonymous functions are typically used as callbacks.

*So what’s a callback?*

I’m glad you asked!

```
function takesACallback(callback) {
    // do some interesting things here
    return "The callback says: " + callback();
}

takesACallback(function() {
    return "I'm the callback!";
}); // returns "The callback says: I'm the callback!"
```

See the function that’s a parameter to the `takesACallback` call? Notice that it doesn’t have a name? That’s an anonymous function.

## Referenced

However, you can still have a **reference** to an anonymous function, just because it is unnamed it doesn’t mean it’s unreferenced.

```
var reference = function() {
    return "I'm still an anonymous function";
}

reference(); // returns "I'm still an anonymous function"
```

The function itself is still anonymous (it doesn’t have a name directly attached to it), but you can call the function by the named reference.

## Declared

Declared functions are not anonymous. They have a name directly attached to the function, with no need for a named reference.

```
function declared() {
    return "I'm not anonymous function";
}

declared(); // returns "I'm not anonymous function"
```

Writing a named function like this results in a **function declaration.**

# Gotcha

According to [Helen](http://helephant.com/2008/08/23/javascript-anonymous-functions/):

> Anonymous functions are created at runtime ... Function declarations are different. They are run before any of the other code is executed so the functions do not have to be declared before the code that calls them.

Here’s an example of the referenced anonymous function and a declared function in action:

```
function tester() {
  declaredFunction();
  referencedFunction();

  function declaredFunction() {
    console.log("I'm a declared function");
  }

  var referencedFunction = function () {
    console.log("I'm an anonymous function called by a reference");
  };
}

tester();
// logs "I'm a declared function"
// Uncaught TypeError: referencedFunction is not a function
```

*Huh? Why did only one of those work?*

This is directly related to [hoisting]() - if you’re not familiar with that term you should read up about it. Go ahead, I’ll wait. All caught up? Good!

Hopefully after reading about hoisting you’ve got an idea of what’s going on. Let’s look in a bit more detail. Although you wrote the code above the JS interpreter converts it to:

```
function tester() {
  function declaredFunction() {
    console.log("I'm a declared function");
  }

  var referencedFunction;

  declaredFunction();
  referencedFunction();

  referencedFunction = function () {
    console.log("I'm an anonymous function called by a reference");
  };
}
```

Now Helen’s quote should make more sense. The anonymous function (which is referenced by `referencedFunction`) isn’t created until it’s position in the code (at runtime). However the declared function is hoisted to the top of the scope and is immediately available for use.

You can find a list of pros and cons for using anonymous functions on [stackoverflow](http://stackoverflow.com/questions/10273185/what-are-the-benefits-to-using-anonymous-functions-instead-of-named-functions-fo).


