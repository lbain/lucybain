---
title: "JS: ES6 Const keyword"
tags: js, ECMAScript 6, const

description: Learn about the new `const` keyword available in ECMAScript 6
---

## A little bit of background

### ES6

ECMAScript 6 (ES6) introduced a lot of new JS keywords to play with. Generally these changes make JS a bit more approchable for new JS developers by making JS more similar to other programming languages.

### Constants

Some languages (particularly compiled ones like Java) have a concept of *constants*. This are like *variables*, but the opposite.

*Wow, that was really clear...*

Constants are like variables in that a value can be assigned to them. They are unlike variables in that their value cannot be changed after the a value has been assigned to them. (There’s a lot more that could be said about this, but I’ll leave it there since it’s enough to get through this post.)

In sudo code it would look kinda like this:

```
variable = 1
constant = 2

variable = 3 // All good since variables can change
constant = 4 // Error since constants can't change
```

## Let’s talk about JS

*So that’s how other languages do it - but what about JS?*

Honestly ES6’s implementation seems pretty similar to other languages.

**Note:** Since ES6 isn’t fully implemented in browsers most people are using a compiler to get from ES6 syntax to normal JS. These compilers might throw errors for some of the examples below.

### Basic usage

ES6 introduced a new `const` keyword to behave like a constant. Something that is defined `const` can only be assigned once.

```
const cat = 'meow';
cat = 'woof';
console.log(cat); // logs 'meow'
```



*But what if I try something tricky?*

There’re are a couple of ways you could try to beat the system, but ES6 has covered them.

Reuse the `const` keyword:

```
const cat = 'meow';
const cat = 'woof';
console.log(cat); // logs 'meow'
```

Change a constant to a variable:

```
const cat = 'meow';
var cat = 'woof';
console.log(cat); // logs 'meow'
```

Declare a constant without defining it:

```
const cat; // SyntaxError
```

Use block scope:

```
const cat = 'meow';
if (true) {
  const cat = 'woof';
}
console.log(cat); // logs meow
```

Use function scope:

```
const cat = 'meow';
function testConsts () {
  const cat = 'woof';
  console.log(cat)
}
testConsts(); // logs woof
console.log(cat); // logs meow
```

(Hopefully those last couple weren’t a surprise becuase JS uses [function scoping](http://lucybain.com/blog/2015/js-es6-let-vs-var/).)

Ideally you should use constants in their intended way without getting too tricky!

### Gotcha

Here’s the big catch: a constant can only be defined once, but it can be changed in other ways. In “programming terms” something that cannot be changed in anyway is **immutable**. ES6 constants are mutable (i.e. not immutable, i.e. changeable).

*How can I change a constant?*

Some object types can be changed without assigning again. Let’s look at a couple.

Arrays:

```
const animals = [];
animals.push('cat', 'dog');
console.log(animals); // ['cat', 'dog']
```

Objects:

```
const cat = {'sound': 'meow'};
cat.sound = 'woof'
console.log(cat.sound); // 'meow'
```

Any mutable object type will have this problem. The immutable types are: Boolean, Null, Undefined, Number, String, Symbol (the primative types).

## Resources

* [Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
* [StrongLoop](https://strongloop.com/strongblog/es6-variable-declarations/)
* [Babel REPL](https://babeljs.io/repl/) if you want to play around with ES6
* [StackExchange](http://programmers.stackexchange.com/questions/278652/how-much-should-i-be-using-let-vs-const-in-es6) for a discussion about when to use `const`