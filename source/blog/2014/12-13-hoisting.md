---
title: 'JS: Explain “hoisting”'
tags: js, interview-questions
---

I'm continuing my series of [JS interview questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions#js). These posts are proving very good practice for the interviews I'm doing!

## Explain “hoisting”

Hoisting is when a JS declaration is lifted (“hoisted”) to the top of it’s scope by the JS interpreter. What this really means is that a variable or function isn't necessarily declared where you think it is. Understandably, this can cause problems. Variables and functions are hoisted differently, as we'll see below.

**Hoisting variables**

We'll start with an example:

```
// Code saved in file:

function containsHoisting() {
    console.log(hoistedVariable);
    var hoistedVariable = "I was hoisted!";
}

containsHoisting(); // logs undefined
```

*Wait, how did `hoistedVariable` get to be undefined? Surely it should be undeclared since we haven't hit `var hoistedVariable` yet.*

It’s because of hoisting! You see, although I wrote the code in the example above, the JS interpreter changes it to this:

```
// What the interpreter changed it to:

function containsHoisting() {
    var hoistedVariable; // <-- this line here!
    console.log(hoistedVariable);
    hoistedVariable = "I was hoisted!";
}
```

That new line is `hoistedVariable` getting hoisted up to the top of it’s scope. So it’s now declared, but not defined.

Here’s a more complex example (inspired by [Adequately Good](http://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html))

```
var hoistedVariable = 1;

function scopingFunction() {
    if (!hoistedVariable) {
        var hoistedVariable = 10;
    }
    return hoistedVariable;
}

scopingFunction(); // returns 10
```

*What?! How can it return 10?*

**Tangent about scopes**

I was surprised about this myself until I understood JS scoping better, here’s how it breaks down:

>In Javascript scopes are defined at **function level**. Many other languages define scope at a block level (as in an `if` block or `for` loop). This is an important difference to remember.

Thus...

**Back to the main event**

The code above gets rewritten in the JS interpreter to look like this:

```
var hoistedVariable = 1;

function scopingFunction() {
    var hoistedVariable; // <-- this line here!
    if (!hoistedVariable) {
        hoistedVariable = 10;
    }
    return hoistedVariable;
}

scopingFunction(); // returns 10
```

Note that the *global* `hoistedVariable` gets completely overwritten by the *local* `hoistedVariable` as declared in `scopingFunction`. So at the point of the `if` conditional `hoistedVariable` is `undefined` and not 1.

**Function hoisting**

Hoisting functions works differently than variables. Since a function is declared and defined at the same time the function definition is hoisted along with the function name.

Since examples make things clearer:

```
function containingFunction() {
    var hoistedVariable = 2 + 2;
    function hoistedFunction() {
        return hoistedVariable;
    }
    return hoistedFunction();
}
containingFunction() // returns 4
```

Hopefully that example wasn't surprising. But just to better understand what’s going on, here’s how the JS interpreter rewrote things:

```
function containingFunction() {
    // this is the hoisted section
    var hoistedVariable;
    function hoistedFunction() {
        return hoistedVariable;
    }

    // here's the rest of the code
    hoistedVariable = 2 + 2;
    return hoistedFunction();
}
containingFunction() // returns 4
```

Notice that the entire `hoistedFunction` gets moved up, while only the declaration for the `hoistedVariable` is hoisted.

Let’s try with a more complicated example:

```
function containingFunction() {
    var hoisted = "I'm the variable";
    function hoisted() {
        return "I'm the function";
    }
    return hoisted(); // results in a TypeError
}
containingFunction()
```

*But wait, the `hoisted` function is defined right there, what gives?*

Because functions are hoisted after variables, naming conflicts can happen. Again, let’s look at what the JS interpreter wrote for this code

```
function containingFunction() {
    // hoisted section
    var hoisted;
    function hoisted() {
        return "I'm the function";
    }

    // rest of the code
    hoisted = "I'm the variable";
    return hoisted();
}
containingFunction() // results in a TypeError
```

As you can see, the function definition for `hoisted` is overwritten by the variable definition (`"I'm the variable"`) which appears lower down in the interpreter’s version of the code. Yet another reason why good names are important!

**Resources**

* [JS is sexy](http://javascriptissexy.com/javascript-variable-scope-and-hoisting-explained/)
* [Adequately Good](http://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html) (which I think is a hilarious name for a coding blog!)

