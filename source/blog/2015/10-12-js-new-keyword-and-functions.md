---
title: 'JS: new keyword and functions'
tags: js, interview-questions
alias : blog/2015/js-ways-to-call-functions/

description: A look into JavaScript functions with particular focus on the “new” keyword for creating objects from JS constructors.
keywords: JavaScript, JS, new, object, constructor
---

I’m still slowly making my through the [javascript interview questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions#js), despite having started a new job on JS. There's just so much I don’t know! Maybe one day I'll actually interview someone with these questions...

Alright, let’s get to today’s question:

## What’s the difference between: `function Person(){}`, `var person = new Person()`, and `var person = Person()`?

*Gah! Too many things!*

Let’s take them one by one:

### 1. `function Person(){}`

Ok, well this defined a function. Hopefully that was fairly obvious by the `function` keyword.

*Wow, mind blowing stuff here...*

The more interesting side of it is the `Person`. Now, the name of the function is user defined (i.e. not a keyword like `function`), but what’s interesting here is the capital `P`. This is a JS convention. (JS doesn’t care at all if you follow it or not, but all the other devs will be sad if you don’t.) The convention is that if a function name starts with a capital letter then that function defines a constructor (similar to a class in other languages). So we can infer that `function Person(){}` defines a constructor.

*Ok, so functions with names starting with a capital letter are usually constructors.*

Yep, it’s really, really common (hopefully you’re using this convention too!), so it’s a pretty safe bet. Let’s move on.

### 2. `var person = new Person()`

So in many other languages we’d say “The `new` keyword creates an instance of the `Person` class.”

*But this is JS, not some “other language.”*

Yes, very true. JS is a world unto itself. But I hope the sentence above will probably help someone from a more traditional object-oriented background.

*Ok, so how does `new` work for JS?*

`new` does three main things:

1. `new` creates a new object. It’s just a plain old, bog standard, nothing-in-it object. It looks like `{}`. Boring, I know, but it’s very important.
2. The newly created object has it’s prototype set to whatever the `Person`’s prototype is right now.
3. Finally the constructor function is called (the body of `Person`) with any references to `this` replaced with the object created in step 1.

*Why is this important?*

Although I knew the final outcome of using the `new` keyword before, having those three steps spelled out helped remove some of the magic. So let’s talk about them in more detail.

**Step 1** (the plain old empty JS object) means that you get a unique “deep copy” (other languages would say “instance”) of the constructor each time it’s run. If `new` didn’t create a new object then you’d constantly be overwriting things in seemingly different objects.

**Step 2** (setting the prototype) means that you can set methods on the constructor’s prototype and they’ll be available on your new object. Something like this:

```
function Person(name) {
    this.name = name;
}
Person.prototype.introduce = function() {
    console.log("Hi, my name is " + this.name);
}

var lucy = new Person('Lucy');
lucy.introduce(); // logs out: "Hi, my name is Lucy"
```

If `lucy`’s prototype hadn’t been set to `Person`’s prototype then the `introduce` method wouldn’t have been available.

**Step 3** (constructor with `this` set) means that each object’s `this` points to the object, rather than the window or something else. Without the third step `this` from the `Person` constructor wouldn’t work correctly and `lucy` wouldn’t be able to introduce herself.

*Huh, ok, so the `new` keyword is super important for getting __new__ objects. See what I did there?*

Moving on...

### 3. `var person = Person()`

Things get a little tricky here, since we don’t actually have the `Person` constructor. It can go one of three ways so let’s look at all of them.

#### Scenario 1 - everything is ruined

`Person` is a constructor that was written to work with the `new` keyword, such as the `Person` in my example above. In this case things will break, hopefully in an expected way given the three steps above.

So, without the `new` keyword from above those three steps won’t happen. Let’s look at what that means step by step. We’re going to use the same example as above, but without the `new` keyword:

```
function Person(name) {
    this.name = name;
}
Person.prototype.introduce = function() {
    console.log("Hi, my name is " + this.name);
}

var lucy = Person('Lucy'); // <-- NO NEW KEYWORD
```

**Step 1** (the plain old empty JS object) doesn’t happen. Now instead of getting a new object for `lucy` all we get is the return value of `Person`. Which is nothing (a.k.a `undefined`). Bummer.

**Step 2** (setting the prototype) doesn't happen. Well that’s kind of a given. Since there’s no new object (see step 1 that didn’t happen) there can’t be a prototype set on it.

**Step 3** (constructor with `this` set) tries to happen. It really does it’s very best. Since there’s no new object to set `this` to, JS does the next best thing and uses the default `this`, the window. So now there’s a brand new property on the window, and you can call it with `window.name` or `this.name` both of which are `"Lucy"`.

*Well that’s a problem.*

Yep, leaving of the `new` keyword when it’s expected will cause all kinds of headaches.

*What’s the “when it’s expected” caveat for?*

Great question! The above scenario is, I think, the most likely one, both for what the question was asking about, and in buggy real life code. However, there are two other options. Let’s look at them now.

#### Scenario 2 - nobody cares

It’s possible that the `Person` constructor was written to avoid just this pitfall. It would look something like this:

```
function Person(name) {
    if (this instanceof Person) {
        this.name = name;
      } else {
        return new Person(name);
      }
}
Person.prototype.introduce = function() {
    console.log("Hi, my name is " + this.name);
}

var lucy = new Person('Lucy'); // <-- NEW KEYWORD IS PRESENT
lucy.introduce(); // logs out: "Hi, my name is Lucy"

var bob = Person('Bob'); // <-- NO NEW KEYWORD
bob.introduce(); // logs out: "Hi, my name is Bob"
```

This takes advantage of the three steps that `new` goes through as discussed above. By the time the constructor is actually run there *should* be an object assigned to `this` with it’s prototype set correctly so `this instanceof Person` is `true`. *However* if someone happened to forget the `new` keyword then the constructor would go straight to the `else` section and create a new object, using the `new` keyword correctly.

This means using the constructor with and without the `new` keyword works correctly (as shown by `bob` and `lucy` above).

*That’s a pretty sneaky trick!*

Yeah, it’s quite clever. It’s also *really* defensive programming. I mean, we can’t write everything to allow important keywords to just be forgotten... I think it’s bad practice (not to mention a little mean) to hide mistakes from people. I want to know when I mess up. Which brings us nicely to:

#### Scenario 3 - warning

Finally we reach a happy middle ground. Scenario 1 failed quietly. Scenario 2 didn’t fail at all, but also allowed incorrect code to work correctly. But scenario 3 will just give a warning, and it’s quite a simple fix.

A while ago I wrote about [strict mode](/blog/2014/js-use-strict/), which is exactly what we’ll use now. Here’s an example:

```
"use strict"; // <-- THIS LINE HERE

function Person(name) {
    this.name = name;
}
Person.prototype.introduce = function() {
    console.log("Hi, my name is " + this.name);
}

var lucy = new Person('Lucy'); // <-- NEW KEYWORD IS PRESENT
lucy.introduce(); // logs out: "Hi, my name is Lucy"

var bob = Person('Bob'); // <-- NO NEW KEYWORD
// throws "Uncaught TypeError: Cannot set property 'name' of undefined"
```

As you can see, using the `new` keyword works exactly as expected. However, if you forget to use `new` an error will be thrown, alerting you to your mistake.

*What’s happening behind the scenes?*

Basically the `"use strict"` just means that JS won’t allow the `this` in the constructor to be bound to the window. Instead it leaves `this` as undefined (since no new object was created to be properly bound to `this`) which cuases the error `Cannot set property 'name' of undefined"`. I think it’s pretty slick.

Note: I couldn’t get the `"use strict"` to work properly in this window’s console when I ran it just now, so here’s a [JSFiddle](https://jsfiddle.net/1nu5g2by/) of the example if you want to double check. Just be sure to have the console of that window open to see the error.

## Recap

*That was quite a lot, can I have it one more time?*

Sure thing, let’s wrap it up!

Our question was "What’s the difference between: `function Person(){}`, `var person = new Person()`, and `var person = Person()`?"

The first one `function Person(){}` defines a function. Since it’s got a capital letter at the beginning of the function name we expect that it’s a constructor.

Next `var person = new Person()` is one way to create new objects. Using this method `person` will have access to everything `Person.prototype` has access to, as well as any instance variables set in the `Person` constructor.

Finally `var person = Person()` is a mistake. There are ways of dealing with mistakes like this (my preference is the `"use strict"` method), but ultimately this should be corrected.

*Done?*

Done! That was a long one - thanks for sticking with me!

## References
* [Capitalise constructor function names](http://stackoverflow.com/a/1564489/863846)
* [What `new` does](http://stackoverflow.com/a/3658673/863846) - I really recommend this question (give it an upvote for me!), as it spelled out the three steps that `new` takes
* [Defensive new](http://stackoverflow.com/a/383503/863846) for discussion around scenario 2
* [Strict mode and new](http://yuiblog.com/blog/2010/12/14/strict-mode-is-coming-to-town/) - look for the section called “Global Leakage”
* [More discussion](http://zeekat.nl/articles/constructors-considered-mildly-confusing.html) this was the reference from the “what `new` does” answer, so I figured it should get some credit too.

 