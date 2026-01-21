---
title: "JS: Enhanced object literals"
tags: ["js", "es6"]

description: Looking at some new features introduced in ES6 for easier object creation.
keywords: js, es6, enhanced objects
---

Here’s some nice [ES6](/blog/tags/es6/) syntactic sugar for creating object literals. I found it hard to read at first and needed a few examples before I could understand what was happening. It’s got a few uses, so we’ll build up more and more complicated examples to see what it can do.

## Ordinary object literals

In vanilla JS we create object literals like this:

```
var a = 1,
    b = 2,
    c = 3;

var obj = {
    a : a,
    b : b,
    c : c
};

console.log(obj); // logs { "a" : 1, "b" : 2, "c" : 3 }
```

*What’s wrong with this way?*

This works, but is quite repetitive and fairly heavy. You have to give the name of the key, even though it’s the same as the name of the variable.

Let’s rewrite it with ES6 object literals:

```
let a = 1,
    b = 2,
    c = 3;

let obj = { a, b, c };

console.log(obj); // logs { "a" : 1, "b" : 2, "c" : 3 }
```

*Gah! What’s happening here??*

This is how I felt when I first read the `let obj = { a, b, c };` line as well. Especially because `{}` is a pretty common way to create hashes (Ruby) or dictionaries (Python). This syntax just felt wrong. But it is certainly more concise so we’re just gonna need to get past the weirdness.

*Yeah, but what’s the code __really__?*

To ease concerns... If you put the above ES6 code into the [Babel REPL](https://babeljs.io/repl/) it will produce the following vanilla JS code:

```
"use strict";

var a = 1,
    b = 2,
    c = 3;

var obj = { a: a, b: b, c: c };

console.log(obj);
```

No funny business here - promise!

*I'm not convinced - what’s an example of this being useful?*

What happens if you change the name of a variable to be something more meaningful, but forget to change the object key? In vanilla JS we have something like this:

```
var firstPlace = 1,
    secondPlace = 2,
    thirdPlace = 3;

var obj = {
    a : firstPlace,
    b : secondPlace,
    c : thirdPlace
};

console.log(obj); // logs { "a" : 1, "b" : 2, "c" : 3 }
console.log(obj.thirdPlace); // undefined
```

We had all the best intentions of using better names, but they didn’t come through after you created the object. (I’m sure you’re a perfect dev who would never do something like this. But I have, and it was super annoying to debug.)

Here’s the same example with ES6 helping us out:

```
let firstPlace = 1,
    secondPlace = 2,
    thirdPlace = 3;

let obj = { firstPlace, secondPlace, thirdPlace };

console.log(obj); // logs { "firstPlace" : 1, "secondPlace" : 2, "thirdPlace" : 3 }
console.log(obj.thirdPlace); // logs 3
```

You can see that it’s a bit easier to keep track of everything with the enhanced object literals.

*Ok, so that was the most basic one. Give me something more interesting!*

Sure thing!

## Dynamic keys

The new syntax also allows dynamic keys to be created more easily. Here’s an example of the ES6 version:

```
let a = 1,
    b = 2,
    c = 3;

let obj = {
  [a+1]: a,
  [b+1]: b,
  [c+1]: c,
}

console.log(obj); // logs { "2" : 1, "3" : 2, "4" : 3 }
```

*But you can have dynamic keys in vanilla JS!*

True, we could use [] notation to remove this problem:

```
var numbers = [1, 2, 3];
var obj = {};

for (var i = 0; i < numbers.length; i++) {
    obj[numbers[i] + 1] = numbers[i];
}

console.log(obj); // logs { "2" : 1, "3" : 2, "4" : 3 }
```

Now the keys and values can be dynamic, but look at that code! The new way is certainly easier to read and write.

*Yeah, it’s looking pretty nice, let’s do another one!*

## Methods

It’s easy enough to put methods on objects in vanilla JS:

```
var obj = {
    hello: function(name) {
        console.log('hello ' + name);
    }
}
obj.hello('world'); // logs "hello world"
```

But with enhanced object literals we can get rid of some of the boiler plate code to tighten things up a bit:

```
let obj = {
  hello(name) {
    console.log('hello ' + name);
  }
};
obj.hello('world'); // logs "hello world"
```

*That’s crazy! Where’s the function keyword?*

It’s not needed any more! ES6 knows `hello` is a function because of the `()` and the method gets created automatically.

## Review

So there you have it! ES6’s enhanced object literals can make object creating easier by adding syntactic sugar. Remember, this doesn’t change how objects work in general. All of these examples can also be written in vanilla JS, so it does’t add new functionality. But it does make writing JS that much easier!

## Resources

* [Maximilian Hoffmann](https://maximilianhoffmann.com/posts/object-based-javascript-in-es6)
* [Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer)
* Overview of all [ES6 features](https://github.com/lukehoban/es6features#enhanced-object-literals)