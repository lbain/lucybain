---
title: 'JS Immediately Invoked Function Expressions'
tags: js, interview-questions

featured: true
---

## Explain why the following doesn’t work as an IIFE: `function foo(){ }();`

*What does “IIFE” even stand for?*

IIFE stands for Immediately Invoked Function Expressions

*Great, so what are IIFEs?*

An IIFE is an anonymous function that is created and then immediately invoked. It’s not called from anywhere else (hence why it’s anonymous), but runs just after being created.

Example:

```
(function () {
  return 5;
} ());
// returns 5 right away
```

They can be used to guard against **unintended effects of hoisting:**

The following code snip-it is from [Wikipedia](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression#Evaluation_context). I didn’t understand how it worked right away, but I wrote the explanation following the snip-it to clear up my confusion.

```
var v = 1;
var getValue = (function(x) {
  return function() { return x; };
}(v));
v = 2;

getValue(); // returns 1
```
*I can’t even read that, what do all the nested functions mean?*

Let’s investigate the IIFE assigned to `getValue` by rewriting it with a helper function:

```
var v = 1;

function helperFunction(x) {
  return function() {
    return x;
  };
}
var getValue = helperFunction(v); // returns an anonymous function

v = 2;

getValue(); // invokes that function
```

*What happens when the `var getValue = helperFunction(v)` line is called?*

1. `helperFunction(v)` gets called with the current value of `v`, which is 1
1. `helperFunction` gets executed, with the param `x` set to 1
1. The anonymous function returned by `helperFunction` gets created, still with `x` set to 1
1. `getValue` is set to the result of `helperFunction`, which is

  ```
  function() {
      return 1;
  };
  ```

So now things look like this:

```
var v = 1;
var getValue = function() {
                 return 1;
               };
v = 2;

getValue();
```
And from here it is hardly surprising that `getValue()` returns 1.

*What would have happened without the IIFE?*

```
var v = 1;
var getValue = function() {
                  return v;
               };
v = 2;

getValue(); // returns 2
```
Although the `return v` is written when `v` is 1, by the time `getValue` is called `v` has been set to 2. Thus `getValue()` actually returns 2.

IIFEs can also be used to enforce **private variables and methods:**

Again, the example is taken by [Wikipedia](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression#Establishing_private_variables_and_accessors) (slightly simplified), and the explanation is my own.

```
var counter = (function(){
  var i = 0;

  return {
    get: function(){
      return i;
    },
    set: function( val ){
      i = val;
    }
  };
}());

counter.get(); // returns 0
counter.set( 3 );
counter.get(); // returns 3
counter.i; // returns undefined
```
*Again with the confusing nested functions! Can I have a rewrite?*


```
function helperFunction(){
  var i = 0;

  return {
    get: function(){
      return i;
    },
    set: function( val ){
      i = val;
    }
  };
};

var counter = helperFunction();

counter.get(); // returns 0
counter.set( 3 );
counter.get(); // returns 3
counter.i; // returns undefined
```
*Ok, that’s a bit clearer, but what is `counter` actually set to?*

`counter` is set to the return value of `helperFunction`, that is just this bit:

```
{
  get: function(){
    return i;
  },
  set: function( val ){
    i = val;
  }
};
```

You'll notice `var i` doesn’t appear anywhere in there. `i` is defined elsewhere in the `helperFunction` / IIFE. Since the return value of `helperFunction` doesn’t give explicit access to `i`, `counter` doesn’t have access.

*Fine, so if that’s all that `counter` has access to, how does `counter.get()` return a value?*

Scopes! The scope from `helperFunction` has access to `i`. The object returned by `helperFunction` (a.k.a `counter`) has access to all the variables defined in `helperFunction`. It works like this:

1. Call to `counter.get()` goes and looks at the `get` function defined in `helperFunction`...

  ```
  get: function(){
        return i;
       }
  ```
1. The `get` function looks for its local scope, which is `helperFunction` ...

  ```
  function helperFunction(){
    var i = 0;

    return {
      get: function(){
        return i;
      },
      set: function( val ){
        i = val;
      }
    };
  };
  ```

1. In `helperFunction` is a definition for `i`...

  ```
  var i = 0;
  ```

1. So `get` can return 0!

### And now back to your scheduled program

With all that explanation behind us, let’s go back to the original question:

**Explain why the following doesn’t work as an IIFE: `function foo(){ }();`**

Because `foo` isn’t being called! Here’s a rewrite:

```
function foo(){
}();
```

This is a function **definition**, it defines `foo`. But it’s not a function **expression** - that is, it’s not understood by the JS parser to actually call a function.

For the parser, things look like this:

```
function foo(){
} // ok, done with that function definition
  // (silly human left off the semicolon, how embarrassing!)

(); // Are they trying to call something? What’s the function’s name?
    // PARSE ERROR
```

In order to prep the parser that we're actually dealing with a function **expression** we have to wrap things up in `()` like so:

```
(
  function foo(){
  }()
);
```
Now the parser reads this as:

```
( // oh goody, we're going to call some function expressions!
  function foo(){ // here's the function definition
  }() // and here's where the function is actually called
);
```
And to finish it all off with a return statement and everything:

```
(function foo(){
  return 'bar';
}());
```

For more information read Ben Alman’s post [introducing IIFEs](http://benalman.com/news/2010/11/immediately-invoked-function-expression/).