---
title: 'JS: anonymous functions'
tags: js, interview-questions
---

## What's a typical use case for anonymous functions?

I'm going to go with my high school training and focus on the word __typical__. So long as we're just talking about typical use, here's my answer:

Anonymous functions are typically used as callbacks.

*So what's a callback?*

I'm glad you asked!

```
function takesACallback(callback) {
    // do some interesting things here
    return "The callback says: " + callback();
}

takesACallback(function() {
    return "I'm the callback!";
}); // returns "The callback says: I'm the callback!"
```
See the function that's a parameter to the `takesACallback` call? Notice that it doesn't have a name? That's an anonymous function.

Note that you can still have a reference to an anonymous function, just because it is unnamed it doesn't mean it's unreferenced.

```
var reference = function() {
    return "I'm still an anonymous function";
}

reference(); // returns "I'm still an anonymous function"
```

This is almost the same as

```
function reference() {
    return "I'm not anonymous function";
}

reference(); // returns "I'm not anonymous function"
```

A named function is called a function declaration.

According to [Helen](http://helephant.com/2008/08/23/javascript-anonymous-functions/):

> Anonymous functions are created at runtime ... Function declarations are different. They are run before any of the other code is executed so the functions do not have to be declared before the code that calls them.

So you can see there's a difference to how the two `reference` example functions are treated by JS, even if the code looks very similar.

You can find a list of pros and cons on [stackoverflow](http://stackoverflow.com/questions/10273185/what-are-the-benefits-to-using-anonymous-functions-instead-of-named-functions-fo).


