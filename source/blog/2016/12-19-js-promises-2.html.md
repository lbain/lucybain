---
title: "Javascript: Promises part one"
tags: js, promises

description: Let’s take a brief overview of what promises are typically used for.
keywords: js, javascript, promises, timeouts
---

We’re continuing on with our discussion of Promises. I’m breaking these posts up quite a lot because I found Promises so confusing when I started working with them. Hopefully talking more in depth and in smaller chunks will help explain how it all fits together.

Although we [previously](/blog/2016/js-promises-1/) set up an example to help us make Thanksgiving dinner, we’re going to focus on basics today. But we’ll get back to the Thanksgiving dinner soon.

Ok, let’s get started!

### Basic promise

To get us started, we’ll look at a simple promise.

```
new Promise((resolve, reject) => {
  if (true) {
    resolve();
  } else {
    reject();
  }
});
```

*That’s a lot of new words!*

Yep, so let’s break them down:

__Line 1: `new Promise((resolve, reject) => {`__

* `new` is used to create a new instance of a constructor. If that doesn’t sound famliar take a few minutes to [read up](/blog/2015/js-new-keyword-and-functions/) about `new`.
* `Promise` is the name of the constructor we’re creating a new instance of. It’s defined as part of core JS, so it’s available natively on [any browser](http://caniuse.com/#feat=promises) that implements it.
* Next we move into the parameter the Promise constructor takes, a function. (Note that I'm using the ES6 arrow function syntax, but that’s just sugar, you can use the old syntax as well.)
* The parameter function takes two arguments, here they’re called `resolve` and `reject`.

__Line 2: `if (true) {`__

Hopefully you already know this one! I’m forcing us to only go down the “happy path” of `true` for easier understanding.

__Line 3: `resolve();`__

Ok, now things are getting interesting! We’re calling the `resolve` method that came in as a parameter to the function that gets passed to the `Promise` constructor.

At this point, we know `resolve` is a method. We also know we didn’t define `resolve` anywhere.

*So does `resolve` come from the promise?*

Yes! That’s right. We’re going to gloss over this right now, and come back to it in a just a little bit. Hold on to your excitement!

__Line 4: `} else {`__

We’re moving out of the “happy path” (in this example `true` is the happy path).

__Line 5: `reject();`__

*This feels a lot like the `resolve` line.*

Yep, just like before, we’re calling the `reject` method that came in as a parameter to the function that gets passed to the `Promise` constructor. And again `reject` comes from the promise (more on that in a moment).

__Line 6-7__

These are just syntax so we’ll skip them.

### Similar-ish example

Let’s pause here to write another example that would have a similar flow to how the Promise code works, but in a “normal” function.

(I’ll admit, this code is pretty contrived, I wouldn’t recommend writing it quite like this in the Real World. Thankfully we’re in Example World, so it’s all good.)

```
function Sounds(printer) {
  const animalSounds = {
    cat: 'meow',
    dog: 'woof'
  };

  function cat() {
    return animalSounds['cat'];
  };

  function dog() {
   return animalSounds['dog'];
  };

  printer(cat, dog);
}

new Sounds((cat, dog) => {
  console.log('The cat says ' + cat());
  console.log('The dog says ' + dog());
});
```

Just like before, let’s break this example down (we’ll go a bit quicker this time):

`function Sounds(printer) {`

As you can see, `Sounds` is a constructor that takes a parameter which is a function. (If you look at the end of the `Sounds` constructor you can see the `printer` parameter is a function.) So far it’s exactly like the `Promise` constructor.

```
const animalSounds = {
  cat: 'meow',
  dog: 'woof'
};
```

We define which animals make which sounds for later use.

```
function cat() {
  return animalSounds['cat'];
};

function dog() {
 return animalSounds['dog'];
};
```

Then `Sounds` defines some internal functions, `cat` and `dog`. For the sake of the example, it doesn’t matter what they do, simply that they’re defined so we can call them.

`printer(cat, dog);`

Here we call the `printer` parameter function and pass along our two internal functions as arguments. This is sneaky because it means `printer` can call `cat` and `dog`, but `printer` doesn’t have access to the internal code for either method. It also means that `cat` and `dog` live inside a [closure](/blog/2014/closures/) where they have access to `animalSounds`.

```
new Sounds((cat, dog) => {
  console.log('The cat says ' + cat());
  console.log('The dog says ' + dog());
});
```

Finally we create the a new instance of the `Sounds` constructor and print out the values we get for `cat` and `dog`.

This flow is exactly the same as how the Promise arguments work. Sure, the `resolve` and `reject` methods do more interesting things than just return `meow` and `woof`, but the basic idea is the same. We pass a function into the constructor, the constructor calls that function with the relevant function parameters, we call those new parameters when we’re ready.

### Tying it together

So let’s write our own `Promise` constructor that we can call using our code from the beginning.

__Warning:__ Do NOT go around redefining JS constructors like this. Doing so will (probably) cause Bad Things to happen.

```
function Promise(callback) {
  function resolve() {
    console.log('resolved the promise');
  };

  function reject() {
    console.log('rejected the promise');
  };

  callback(resolve, reject);
}

new Promise((resolve, reject) => {
  if (true) {
    resolve();
  } else {
    reject();
  }
});
```

This will print `'resolved the promise'` since we only go down the `true` happy path.

- - - 

Phew! We’ll wrap up here for now, turns out there’s a lot to say about Promises! I’ll continue on next time to talk about what `resolve` and `reject` actually *do*. Hopefully taking this time to discuss the layout and the foundation helps you read the examples in future posts.
