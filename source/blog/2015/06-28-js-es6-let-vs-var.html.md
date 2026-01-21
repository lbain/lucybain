---
title: "JS: ES6’s let vs. var"
tags: ["js", "es6"]

description:
keywords: es6, js, interview-questions
---

This isn’t a “real” interview question from the list, but I reckon it’s a good one. Plus it came up at work today and I didn’t know the difference. So here it is in question form:

## What’s the difference between ES6’s `let` and “traditional” JS’s `var`?

*Let’s start with the traditional `var`.*

## function vs. block level scoping

Can do! As you may remember I [wrote about](/blog/2014/hoisting/#scopes) scopes in JS a while ago. We’ll cover it again here with more examples to be really clear about it. Many other languages use **block** level scoping. However, JS decided to use **function** level scoping.

*What does that mean?*

Well, here‘s an example of **block** level scoping in Ruby.

```
def testScope
    if true
        scope_tester = 1
        puts scope_tester # 1
    end
    puts scope_tester # nil
end
```

As you can see, the `scope_tester` in the if **block** only lived in the if block. It didn’t set the value of `scope_tester` outside the block. That’s because Ruby uses block level scoping which means the `scope_tester` in the block only lives in the block. It could have been called `inside_scope` for all it matters.

Note that you can declare a variable out of the block level scope, use it in the block level scope, and those changes will be persisted. Here’s an example of that:

```
def test_scope
    scope_tester = 0
    puts scope_tester # 0

    if true
        scope_tester = 1
        puts scope_tester # 1
    end

    puts scope_tester # 1
end
```

That’s because variables are available through the block they are defined in. In this case the `test_scope` function’s block defines the boundaries for `scope_tester`.

## Traditional JS’s `var`

Now we’ll look at the **function** level scoping that JS uses:

```
function testScope() {
    if (true) {
        var scopeTester = 1;
        console.log(scopeTester); // 1
    }
    console.log(scopeTester); // 1 <-- surprise!
}
```

Here the value of `scopeTester` is persisted through out of the if block. In fact, the single `scopeTester` variable is available throughout the entire `testScope` method. That’s because [JS uses hoisting](/blog/2014/hoisting/) to define the variables.

Note that this isn’t surprising when you use a variable that was defined out of the if block in the function:

```
function testScope() {
    var scopeTester = 0;
    console.log(scopeTester); // 0

    if (true) {
        scopeTester = 1;
        console.log(scopeTester); // 1
    }
    console.log(scopeTester); // 1 <-- not surprise!
}
```

For people who aren’t used to JS this use of scoping looks in consistent. Sometimes, like in the second example, you expect the change to persist outside of the if block, and sometimes, as in the first example, you don't.

## `let` from ES6

Unsurprisingly this block vs. function scoping causes problems for people new to JS (like me!). It also adds complexity for the programmer to think about that’s often unnecessary. So for ES6 the powers that be decided to add a new keyword `let` that would have block scope.

Let’s run through those examples again! Unfortunately ES6 isn’t properly implemented in browsers yet, so we can’t just chuck the ES6 code into the console like we normally would. However we can use [Babel](https://babeljs.io/) to convert the ES6 code to normal JS code and see what would happen.

ES6 code:

```
function testScope() {
    if (true) {
        let scopeTester = 1; // <-- using let here!
        console.log(scopeTester); // 1
    }
    console.log(scopeTester); // undefined <-- awesome!
}
```

Translates to:

```
"use strict";

function testScope() {
    if (true) {
        var _scopeTester = 1; // <-- using let here!
        console.log(_scopeTester); // 1
    }
    console.log(scopeTester); // undefined <-- awesome!
}
```

As you can see, using `let` creates a whole new variable to make sure there is no naming conflict. Sweet - now the `scopeTester` variable is only available in the if block where it’s defined. This gives JS the consistent block level scoping that we’ve come to expect from other languages.

Now we’ll look at the second example:

```
function testScope() {
    var scopeTester = 0;
    console.log(scopeTester); // 0

    if (true) {
        let scopeTester = 1; // <-- using let here!
        console.log(scopeTester);
    }
    console.log(scopeTester);
}
```

Translates to:

```
"use strict";

function testScope() {
    var scopeTester = 0;
    console.log(scopeTester); // 0

    if (true) {
        var _scopeTester = 1; // <-- using let here!
        console.log(_scopeTester);
    }
    console.log(scopeTester); // 0
}
```

Again, we got a whole new variable inside the if block, so no need to worry about the unexpected function scope of `var`.

*Thanks ES6, that’s really helpful!*

## Resources

* [StackOverflow](http://stackoverflow.com/questions/762011/javascript-let-keyword-vs-var-keyword)
* [MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/let)
* On why you should [always use `let`](http://programmers.stackexchange.com/questions/274342/is-there-any-reason-to-use-the-var-keyword-in-es6)
* To see what ES6 code looks like in “normal” JS you can use [Babel’s REPL](https://babeljs.io/repl)