---
title: "Javascript: pre-Promises"
tags: js

description: This post sets the scene for the promises work coming in the next blog post.
---

Promises have confused me for quite a while, so I decided I should spend some time thinking about them. Turns out they’re really powerful, and there’s a fair bit going on with promises. This first post has no promises code, but instead gives some general information about promises and then sets up the problem that promises are meant to solve. I’ll reference this problem in my next blog post which will have plenty of promise code!

## Background

*Ok, you got me all excited about promises, but what do they even __do__?*

> The Promise object is used for asynchronous computations. A Promise represents a value which may be available now, or in the future, or never.

– MDN’s [documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

But I’ll admit I didn’t really know what that meant when I first read it, so let’s break it down a bit:

> The Promise object

Ok, we know promises are objects, and since they wrote **P**romise with a capital P we also know it’s a [constructor](/blog/2015/js-new-keyword-and-functions/).

> used for asynchronous computations

Well, “asynchronous computations” are ones that don’t block the main execution thread, typically because they are long running. A common example is an [ajax](/blog/2015/js-how-does-ajax-work/) request for data from the server. We can fire off the request, but we don’t want to stop the rest of the page from working while we wait for that request to return. Another example (which we’ll work with later) is timeouts - the whole page shouldn’t get locked while we wait for the timer to expire!

> A Promise represents a value
 
Hmmm, now things are getting a bit weird. It “represents” a value, but isn’t the value itself. It’s not that the promise *is* `5`, but that it represents something else. Let’s keep reading...

> a value which may be available now, or in the future, or never.

Alright, so this value is a bit of a [Schrödinger's cat](https://en.wikipedia.org/wiki/Schr%C3%B6dinger's_cat) type value. It may or may not be available, both now and in the future.

*Yikes! How are we supposed to program with so many unknowns?!*

But you already do!

## Async code without promises

### Round one

Let’s start with our timer example. It was recently Thanksgiving, so we’re going put on a Thanksgiving feast!

First we need to roast the turkey:

```
function makeTurkey() {
  console.log('Making turkey');
  setTimeout(() => {
    console.log('turkey - done!');
  }, 1000);
}

makeTurkey();
```

*1 second to roast a turkey...?*

Just go with it, no need for the examples to run in real time!

As you can see, we’ll log out `Making turkey` and then a second later we’ll log `turkey - done!`.

So far so good. We’re running asynchronous code without promises and not hitting any problems.

But our Thanksgiving feast is pretty sad. Just a turkey. It needs some sides!

```
function roastVeggies() {
  console.log('Roasting veggies');
  setTimeout(() => {
    console.log('veggies - done!');
  }, 1000);
}

roastVeggies();
```

Fantastic, now we can have a side of roast veggies. But we only have a small oven! We can’t roast the veggies and the turkey at the same time, so we’ll have to modify our code a little.

```
function makeTurkey() {
  console.log('Making turkey');
  setTimeout(() => {
    console.log('turkey - done!');
    roastVeggies(); // <-- New line here!
  }, 1000);
}

makeTurkey();
```

Ok, we’re back on track for our feast! Except we don’t have any plates to eat off of - oops!

```
function setTable() {
  console.log('Setting table');
  setTimeout(() => {
    console.log('table - done!');
  }, 1000);
}
```

Of course, we only want to set the table when the turkey and veggies are done (we’re using the table as a work surface for dessert until we’re ready to eat). So again, we need to modify the code a bit:

```
function makeTurkey() {
  console.log('Making turkey');
  setTimeout(() => {
    console.log('turkey - done!');
    roastVeggies();
    setTable(); // <-- New line here!
  }, 1000);
}

makeTurkey();
```

*But that won't work, we need to wait for the veggies to finish roasting first*

Right you are, let’s fix that:

```
function roastVeggies() {
  console.log('Roasting veggies');
  setTimeout(() => {
    console.log('veggies - done!');
    setTable(); // <-- New line here!
  }, 1000);
}

roastVeggies();
```

Let’s write out the full code in all it’s glory:

```
function makeTurkey() {
  console.log('Making turkey');
  setTimeout(() => {
    console.log('turkey - done!');
    roastVeggies();
  }, 1000);
}

function roastVeggies() {
  console.log('Roasting veggies');
  setTimeout(() => {
    console.log('veggies - done!');
    setTable();
  }, 1000);
}

function setTable() {
  console.log('Setting table');
  setTimeout(() => {
    console.log('table - done!');
  }, 1000);
}

makeTurkey();
```

Code on [CodePen](https://codepen.io/lbain/pen/QGaJXo)

Excellent! We get the output:

```
Making turkey
turkey - done!
Roasting veggies
veggies - done!
Setting table
table - done!
```

So everything works as expected.

*The code isn’t too bad...*

Yeah, I agree. It’s not too bad. Yet.

### Round two

Let’s make our requirements a bit more complicated. Now we can roast our veggies and the turkey at the same time (we got a bigger oven), but we still only want to set the table when all the cooking is finished.

First we’ll update the `makeTurkey` code so it doesn’t call `roastVeggies`

```
function makeTurkey() {
  console.log('Making turkey');
  setTimeout(() => {
    console.log('turkey - done!');
    // roastVeggies(); <-- This line no longer needed
  }, 1000);
}
```

Next we’ll update the main project execution to call `roastVeggies` at the same time as `makeTurkey`.

```
makeTurkey();
roastVeggies();
```

*But how do we know when to set the table?*

Well, for now we can leave `setTable` where it is in the `roastVeggies` call. Since `roastVeggies` and `makeTurkey` both take `1000ms` to complete it doesn’t much matter where the set table is called from. (Note: this isn’t entirely accurate as one must finish before the other, but we’ll ignore that race condition. For now!)

Ok, so here’s our final code:

```
function makeTurkey() {
  console.log('Making turkey');
  setTimeout(() => {
    console.log('turkey - done!');
  }, 1000);
}

function roastVeggies() {
  console.log('Roasting veggies');
  setTimeout(() => {
    console.log('veggies - done!');
    setTable();
  }, 1000);
}

function setTable() {
  console.log('Setting table');
  setTimeout(() => {
    console.log('table - done!');
  }, 1000);
}

makeTurkey();
roastVeggies();
```

Code on [CodePen](https://codepen.io/lbain/pen/rWpoax)

And our output is:

```
Making turkey
Roasting veggies
turkey - done!
veggies - done!
Setting table
table - done!
```

Which is exactly what we want! The turkey and veggies start roasting at the same time, finish some time later, and then we set the table.

*I get the feeling there’s a catch...*

Unfortunately, there is.

Unlike cooking, most async calls take an unknown length of time to complete (like an ajax request). We can’t count on one call returning before another, or taking the same length of time. We cheated a bit in the previous example because we knew that roasting the turkey and veggies would take the same amount of time.

So let’s look at a more realistic example:

### Round three

First we’ll write a quick random number generator:

```
function random(min, max) {
    return Math.random() * (max - min) + min;
}
```

Next, we’ll set `roastTurkey` and `roastVeggies` to take a random amount of time between 100 and 2000 ms.

```
function makeTurkey() {
  console.log('Making turkey');
  setTimeout(() => {
    console.log('turkey - done!');
  }, random(100, 2000)); // <-- line updated!
}

function roastVeggies() {
  console.log('Roasting veggies');
  setTimeout(() => {
    console.log('veggies - done!');
    setTable();
  }, random(100, 2000)); // <-- line updated!
}
```

Then we’ll run the code and see what happens! (It might take a few attempts to get result below.)

```
Making turkey
Roasting veggies
veggies - done!
Setting table
turkey - done!
table - done!
```

*Oh no! We’ve started on the table before the turkey was done!*

Oh no indeed! Now that the turkey and veggies take a variable time to cook (a much more realistic example of async code) we don’t know when to set the table.

*Ok, so now what?*

We’ll do one more iteration to get this version to work properly.

Remember, our constraints are:

1. The two roastings can happen at the same time (they’re at least started together).
2. The table must not be set while anything is roasting.

Now we need a way to know when the timers have finished.

**Warning!** This is not good code! The whole point of this exercise is to find an example where promises would be a better solution. Do not try this at home!

We’ll start by keeping track of the two timers and clearing them out when the timers have expired:

```
let turkeyTimer;
let veggieTimer;

function makeTurkey() {
  console.log('Making turkey');
  turkeyTimer = setTimeout(() => { // <-- line updated
    console.log('turkey - done!');
    turkeyTimer = false;  // <-- new line
  }, random(100, 2000));
}

function roastVeggies() {
  console.log('Roasting veggies');
  veggieTimer = setTimeout(() => { // <-- line updated
    console.log('veggies - done!');
    veggieTimer = false;  // <-- new line
  }, random(100, 2000));
}
```

You’ll notice these are global variables.

*boo, hiss*

That’s right, but we’ll need to access them in just a moment.

Alright, now we’ve got our timers all set up we need to check for when they’ve completed. Again, we don’t know when this will happen so we have to check the timers every millisecond to find when they’ve finished. Once they’ve finished we’ll set the table and clear out the check method.

```
const checkReady = setInterval(() => {
  if (!turkeyTimer && !veggieTimer) {
    setTable();
    clearInterval(checkReady);
  }
}, 1);
```

So the final version of this round looks like:

```
let turkeyTimer;
let veggieTimer;

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function makeTurkey() {
  console.log('Making turkey');
  turkeyTimer = setTimeout(() => {
    console.log('turkey - done!');
    turkeyTimer = false;
  }, random(100, 2000));
}

function roastVeggies() {
  console.log('Roasting veggies');
  veggieTimer = setTimeout(() => {
    console.log('veggies - done!');
    veggieTimer = false;
  }, random(100, 2000));
}

function setTable() {
  console.log('Setting table');
  setTimeout(() => {
    console.log('table - done!');
  }, 1000);
}

makeTurkey();
roastVeggies();

const checkReady = setInterval(() => {
  if (!turkeyTimer && !veggieTimer) {
    setTable();
    clearInterval(checkReady);
  }
}, 1);

```

Code on [CodePen](https://codepen.io/lbain/pen/ObzrPB)

*Yikes!*

That’s right. This code is not very nice. It works, but it’s confusing and needing to poll every 1ms to see if it’s time to set the table is pretty terrible.

*There must be a better way!*

There is! We’ll be looking at promises next time to do just that.

Check in again soon to see how all this can be so much better!
