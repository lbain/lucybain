---
title: 'JS: null, undefined, and undeclared'
tags: js, interview-questions

featured: true
---

## What’s the difference between a variable that is: null, undefined, or undeclared?

Here’s a [TL;DR](http://stackoverflow.com/a/834095/863846) version I found quite useful when writing this.

I think they make more sense in the opposite order: undeclared, undefined, and null. That’s the order I’m going to tackle them anyways.

First up is **`undeclared`**.

A variable is undeclared when it does not use the `var` keyword. It gets created on the global object (that is, the window), thus it operates in a different space as the declared variables.

Example:

```
var declaredVariable = 1;

function scoppedVariables() {
  undeclaredVariable = 1;
  var declaredVariable = 2;
}

scoppedVariables();

undeclaredVariable; // 1
declaredVariable; // 1
```


For more discussion on undeclared variables, checkout [Mozilla’s documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var).

Note: this will not work in [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode). It will throw an error when it gets to the `undeclaredVariable` - see this [example](https://jsfiddle.net/glenselle/9czx6dLg/2/). Thanks to Glen Selle for his comment with this update.

<br/>

Now let’s move on to **`undefined`**.

Something is `undefined` when it hasn’t been defined yet. If you call a variable or function without having actually created it yet the parser will give you an `not defined` error.

Example:

```
var undefinedVariable; // undefined
typeof undefinedVariable; // "undefined"

undefinedFunction(); // undefined
typeof undefinedFunction; // "undefined"
```
Note that the `typeof` returns `"undefined"`, therefore `undefined` is a primitive type.

The fix for an undefined variable or function is easy, simply define it:

```
var definedVariable = 'test';
typeof definedVariable; // "string"

function definedFunction(){
  return "I'm defined!"
}
typeof definedFunction // "function"
```

You can know if a variable is undefined with the following:

```
if (typeof(variable) !== "undefined") {
  console.log('variable is not undefined');
} else {
  console.log('variable is undefined');
}
```
<br/>

Finally we'll finish up with **`null`**.

`null` is a variable that is defined to have a null value.

```
var nullVariable = null; // null
typeof nullVariable // "object"
```
You probably don’t often purposefully define a variable to `null`, but it may be the return value of a function. Often you'll need to gaurd against `null` values in your code.

You can know if a variable is null with the following:

```
if( variable === null ) {
  console.log('variable is null');
} else {
  console.log('variable is not null');
}
```

<br/>
I think the order “undeclared, undefined, and null” makes sense since it’s increasing order of certainty.

* `undeclared` variables don’t even exist
* `undefined` variables exist, but don’t have anything assigned to them
* `null` variables exist and have null assigned to them
