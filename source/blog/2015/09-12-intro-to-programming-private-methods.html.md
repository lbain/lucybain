---
title: "Intro to programming: Private methods"
tags: ["programming", "methods", "privacy"]
published: false

description: A brief overview of how privacy works in programming - specifically with javascript.
keywords: javascript, privacy, methods vs. functions
---

I’m going to write a post about using closures to create private methods from the [javascript interview questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions#js). This post is a primer for that one - we’ll learn about methods vs. functions and private vs. public methods.

Ok, let’s get started!

## Methods vs. Functions

*How are methods difference from functions?*

Methods are functions that are associated with objects. Basically a **method** is done **on an object**, and a **function** is done **to something.** Here’s a quick example:

```
var obj = {
    name: 'object',
    helloMethod: function() {
        console.log("Hello " + this.name);
    }
}

function helloFunction(input) {
    console.log("Hello " + input);
}

obj.helloMethod(); // logs "Hello object"
helloFunction('function'); // logs "Hello function"
```

Since the `helloMethod` is available on the `obj` object it’s a method. But the `helloFunction` is available on it’s own, therefore it’s a function.

### Private vs. Public

*Sweet, I get methods and functions! What does “private” mean?*

The code above means any other code can call `helloMethod`. There’s no limitations for that. Now for logging out “Hello object” we probably don’t care about restricting which code can update, but let’s use a different example:

```
var gramps = {
    age: 97
}

gramps.age; // returns 97
```

Right now `age` is public information - all code can access it directly off the `gramps` object. But `gramps` doesn’t want just anyone to know how old he is! This is **private** information - something no other section of the code should be able to access. The `gramps` object should know his age and be able to work with it, but otherwise the information is a secret.

Here’s how we can implement a private attribute for `gramps`.

```
var gramps = new function() {
    var age = 97;
    this.sayAge = function() {
        console.log("I'm " + age + " years old!");
    }
    return this;
}

gramps.sayAge(); // logs "I'm 97 years old!")
gramps.age; // undefined
```

Here the `age` attribute is private - only the `gramps` object can know what the value of `age` is. Of course a method on the `gramps` object can access the `age` variable - `sayAge` does just that!

## Resources

* [StackOverflow](http://stackoverflow.com/questions/155609/difference-between-a-method-and-a-function) helpful as always!
* [phpied](http://www.phpied.com/3-ways-to-define-a-javascript-class/) for information about how I created the `gramps` object with privacy (section 3)

