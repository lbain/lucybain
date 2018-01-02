---
title: "JS: ES6’s spread operator for objects"
tags: js, es6

description: A description of the new spread operator introduced in ES6.
---

Over two years ago I wrote about [destructuring assignment](/blog/2015/js-destructuring-assignment-es6/), which has been one of my favourite features of ES6. Since then I’ve also come to value destructuring’s “sibling” feature - the spread operator. Although you can use the spread operator on other things, this post focuses on how to use it with objects.

## What it does

*You talk about an “operator,” but what is it actually?*

To start with, the spread operator is `...`. So you can write something like:

```
const cat = { age: 4 };
{ ...cat }; // this isn't useful (yet), but it is valid
```

As of ES6, using three dots in a row is valid code and pretty useful code at that! `...` *spreads* out the content so you can manipulate it more easily.

Let’s look at some examples.

## `...` to copy an object

It’s pretty common to want to base one object off of another, something like this:

```
var cat = { age: 4 };
var kitten = cat;
kitten.age = 1;
```

*Doesn’t that have a bug?*

Yes! `kitten` and `cat` refer to the same object. We didn’t create a new object for `kitten` to reference, we just pointed `kitten` to the existing `cat` object. You can see that here:

```
console.log(kitten.age); // 1
console.log(cat.age); // 1 <-- problem!
```

Using the spread operator we can easily create a new object with all the same properties of an existing object.

```
const cat = { age: 4 };
const kitten = { ...cat }; // <-- changed
kitten.age = 1;
console.log(kitten.age); // 1
console.log(cat.age); // 4 <-- fixed!
```

You can see that we created a new object for `kitten` to reference when we used the spread operator.

*Can you explain the `{ ...cat }` line a bit?*

Sure thing, the `{` tells Javascript that we want to create a new object. Next, the `...cat` says that we want that new object to contain all the same contents as the `cat` object. And finally, `}` means that we’re finished with that object and don’t want to add anything else to the object.

**Warning!**

It’s fairly common for people to expect `...` to [produce a deep copy](https://stackoverflow.com/questions/38416020/deep-copy-in-es6-using-the-spread-sign). Let’s be cleare The spread operator **does not deep copy**, while the spread operator does create a *new object*, the properties’ *values* are simply references and not new instances. For example:

```
const cat = { age: 4, toys: ["mouse", "catnip"] };
const kitten = { ...cat };
kitten.toys[1] = "yarn";
console.log(kitten.toys); // ["mouse", "yarn"]
console.log(cat.toys); // ["mouse", "yarn"] <-- problem!
```

So using the spread operator to create new objects might be fine, it might cause unintended side effects. Please be careful!

## `...` as an object base

So far we've only used `...` to create a copy of an existing object, but it’s actually more powerful than that. We’ll use a different example to add a *new property* to an object created with the spread operator:

```
const cat = { legs: 4 };
const dog = {
    ...cat,
    sound: "woof"
};
console.log(cat); // { legs: 4 }
console.log(dog); // { legs: 4, sound: "woof" }
```

Again, you can see the `cat` object wasn’t changed, but the new `dog` object has all the properties from `cat` as well as the new `sound` property.

*But cats make sounds too, what happens if you assign the sound property to `cat`?*

```
const cat = { legs: 4, sound: "meow" };
const dog = {
    ...cat,
    sound: "woof"
};
console.log(cat); // { legs: 4, sound: "meow" }
console.log(dog); // { legs: 4, sound: "woof" }
```

Everything works exactly like you’d hope it would! The `cat` object has the new `sound` property, with `"meow"` correctly assigned. And the `dog` object is created with the `sound` property set to `"woof"`.

Let’s check out those lines more closely:

```
const dog = {
    ...cat,
    sound: "woof"
};
```

Just like before, the `{` starts a new object. Then using the spread operator on `cat` adds all the `cat` properties to the new object. Our new `sound: "woof"` **overwrites** the existing `sound` property from `cat`. And finally we have the `}` to finish our new object.

**Warning!**

The line order maters for this to work. We need `sound: "woof"` to come **after** `...cat` so the overwrite happens. This version does *not* do what we want:

```
const cat = { legs: 4, sound: "meow" };
const dog = {
    sound: "woof",
    ...cat
};
console.log(cat); // { legs: 4, sound: "meow" }
console.log(dog); // { legs: 4, sound: "meow" }
```

Because we put the `...cat` after the `sound: "woof"` the `cat`'s `sound` property overwrote the `sound: "woof"` property.

## Wrapping up

Well there you have it. The spread operator is super handy for quickly creating and updating objects. It has other uses too (see the Mozilla docs below), but I’ve found I use this version the most. Enjoy!

## Resources

* [Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator) documentation
* The [proposal](https://github.com/tc39/proposal-object-rest-spread) to add the spread operator to JS