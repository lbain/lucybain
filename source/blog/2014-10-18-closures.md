---
title: 'JS: what is a closure?'
tags: js, interview-questions
---

## What is a closure, and how/why would you use one?

A closure is a way of keeping access to variables in a function after that function has returned.

*Fantastic, now again, not as a dictionary.*

Usually you lose access to variables when a function returns:

```
function notAClosure() {
    var shortLivedVariable = "I'm only here for a little while";
    return shortLivedVariable;
}
notAClosure(); // returns "I'm only here for a little while"
```

Notice that nothing has access to `shortLivedVariable` now that `notAClosure` has run. Sure, you can call `notAClosure` again (and again and again), but each call will create a whole new `shortLivedVariable`. But hey, it's hard to tell that each `shortLivedVariable` is brand new, so let's clear that up a bit.

```
function stillNotAClosure(anotherShortLivedVariable) {
    return anotherShortLivedVariable;
}
stillNotAClosure("brand"); // returns "brand"
stillNotAClosure("new"); // returns "new"
stillNotAClosure("string"); // returns "string"
```
Thus, you can see `stillNotAClosure` doesn't retain any reference to previous calls.

*Ok, so that's what a closure isn't, but what __is__ a closure?*

In a closure those variables stick around for a while longer since there is a reference to the variables after the function returns.

```
function aClosure() {
    var longLivedVariable = "I'm here for a long time";
    var innerFunction = function inner() {
        return longLivedVariable;
    }
    return innerFunction;
}
var closure = aClosure(); // returns a reference to innerFunction
closure(); // returns "I'm here for a long time"
```

Notice that `aClosure` doesn't return `longLivedVariable`, but rather `innerFunction`. This means there's a reference hanging around to `innerFunction`, and because `innerFunction` has a reference to `longLivedVariable`, that variable continues to exist.

Finally, when we call `closure()`, we're really calling `innerFunction()` (the returned value of `aClosure()`), which in turn returns `longLivedVariable`.

*Prove it, call the closure multiple times.*

You got it.

```
function stillAClosure(anotherLongLivedVariable) {
    var innerFunction = function inner() {
        return anotherLongLivedVariable;
    }
    return innerFunction;
}
var closure = stillAClosure("The same string");
closure(); // returns "The same string"
closure(); // returns "The same string"
closure(); // returns "The same string"
```

And here's even more proof:

```
var closure1 = stillAClosure("String 1");
closure1(); // returns "String 1"
closure1(); // returns "String 1"

var closure2 = stillAClosure("String 2");
closure2(); // returns "String 2"
closure2(); // returns "String 2"

// And here's the kicker
closure1(); // returns "String 1"
```

Bam! Did you see that! `closure1` kept a reference to `"String 1"` even though `stillAClosure` had been called with a whole other parameter (namely `"String 2"`). That's some pretty cool stuff!

*OK, I'm convinced. But now __why__ would I ever want to use a closure?*

Well, since closures keep access to the variables they can be used to save state. And things that save state look a whole lot like objects. (Before I get any haters, I know you can use closures for a bunch of other things, but this is a reasonable example.)

```
function cat(name) {
    return {
        sayName: function() {
            return name;
        }
    }
}

var fluffy = cat('Mr. Fluffy');
fluffy.name // returns undefined
fluffy.sayName() // returns 'Mr. Fluffy'

var whiskers = cat('Whiskers');
whiskers.sayName() // returns 'Whiskers'
```
So this way you can create a whole bunch of `cat` objects that have a private `name` variable, which you can access via the `sayName` method.


