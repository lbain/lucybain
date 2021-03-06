---
title: "JS: Promises/A+, jQuery Deferreds, and errors"
tags: js, promises

description: A look into how Promises/A+ vs jQuery Deferreds handle errors differently.
keywords: js, promises, deferreds, promises/a+, vs
---

As I said, I’m having difficulty understanding all the jargon associated with promises. This post is a continuation from [JS: promise and deferred](/blog/2016/js-promises-vs-deferred/) and we’ll take a deeper look into how Promises and Deferreds handle errors. You can read about the [history](/blog/2017/js-promises-a-plus-jquery-history/) of why these two exist, but we’re going to focus on the practical differences today.

As a quick reminder:

* Promises/A+ is a [specification](https://promisesaplus.com/) for how promises should work. Many [libraries](https://github.com/promises-aplus/promises-spec/blob/master/implementations.md) implement this specification, but not all. You can test a library with the [test suite](https://github.com/promises-aplus/promises-tests) to find if it is compliant.
* Deferred is jQuery’s implementation of the concept of promises. Deferreds are not Promises/A+ compliant (the specification came after Deferreds).

The differences are fairly subtle (I didn’t notice them until a co-worker told me about them), but important to note and interesting to play with for a blog post!

**Note:** I’m not using asynchronous code in my because it make the examples more complicated and the logic harder to see. The examples below wouldn’t work the same way with async code (for example, `console.log`), but they clarify the intent.

## Promise’s state after an error

### Promises/A+

The specific rule from the specification we’ll look into is [2.3.3.2](https://promisesaplus.com/#point-55):

> If retrieving the property x.then results in a thrown exception e, reject promise with e as the reason.
> 

*Yawn, in human please...*

The bit we’re interested in reads like this:

> If code from a promise results in an error, the promise *must* be rejected. 

*Seems simple enough*

Yes, nothing complicated (so far). Let’s look at a simple example:

```js
const resolvedPromise =  Promise.resolve();
console.log(resolvedPromise);
// [[PromiseStatus]] : "resolved"

const errorPromise = resolvedPromise.then(() => {
  throw new Error('Promise error');
});

console.log(errorPromise);
// [[PromiseStatus]] : "rejected"

errorPromise.then(() => {
  // this never runs because the promise was rejected
  // before getting to this code
  console.log('Never run'); 
});
```

As you can see, `resolvedPromise` settled to a “resolved” state and never threw an error. However `errorPromise` did throw an error so it settled to a “rejected” state. Because of rules like this one, it is not possible for a Promises/A+ promise to settle in a “pending” state. **If the promise has settled, the Promises/A+ spec guarantees that it has been resolved or rejected.**

*Hmmm, that last sentence is in bold, seems like it’s important.*

Yep, that’s the main thing we’re going to look into today.

### jQuery’s Deferred

jQuery’s Deferred (their implementation of promises) is quite relaxed. It was written before the rules settled down, so it isn’t as picky.

Again, let’s look at an example:

```js
const resolvedDeferred = $.Deferred().resolve();
resolvedDeferred.state(); // "resolved"

const errorDeferred = resolvedDeferred.then(() => {
  throw new Error('Deferred error');
})

errorDeferred.state(); // "pending"
```

*What’s the difference?*

Although `errorDeferred` threw an error, it has not settled, instead it’s state is still “pending”. There’s no way to know if `errorDeferred` is pending because of an error, or because the promise is taking a long time to settle (e.g. an ajax request).

**If the promise has settled, a Deferred can be pending, resolved, or rejected.**

*So the difference is that a Deferred will stay pending and a Promises/A+ compliant promise won’t?*

Yep, that’s what we’re looking at right now.

*That doesn’t seem like a big difference...*

Like I said, I didn’t notice the difference until someone pointed it out to me. But the way the errors are handled is different as well. We’ll look at that next.

## Handling errors from promises

Ok, so now we know what happens to these two types of promises when they encounter an error. But how do we handle the errors themselves?

### Promises/A+

Errors thrown in a Promise need to be explicitly handled by the promise chain. They do not bubble up to the window. In fact, not all browsers will show you the error.

Google Chrome (version 55.0.2883.95) does:

![Google Chrome displays an error for exceptions thrown in promises](/images/blog/promises-vs-deferreds/chrome-with-error.png)

But Firefox (version 47.0) does not:

![Firefox (version 47.0) does not display an error for exceptions thrown in promises](/images/blog/promises-vs-deferreds/firefox-no-error.png)

Although it seems browsers are moving towards supporting showing the error. Firefox (version 51.0.1) does show the error:

![Firefox (version 51.0.1) displays an error for exceptions thrown in promises](/images/blog/promises-vs-deferreds/firefox-with-error.png)

*Well, and should they display the error?*

Technically not showing the error message is correct as the Promise doesn’t bubble the error out to the browser. (That said, being able to see the errors is very helpful for debugging.)

*Ok, so, practically speaking, how should I handle errors?*

What all this means is that you cannot use a normal try/catch for errors thrown by Promises. Let’s try it anyways to see what happens:

```js
try {
  const resolvedPromise =  Promise.resolve();

  const errorPromise = resolvedPromise.then(() => {
    throw new Error('Promise error');
  });
} catch (error) {
  // This catch never gets triggered because the "Promise error"
  // isn't bubbled up this far
  console.log('Does not run');
}
```

*Alright, now we know what doesn’t work...*

To actually handle the error we need to use a `catch` on `errorPromise`, so we’re explicitly handling the error directly on the promise.

Let’s rewrite the previous example to correctly catch the `Promise error`:

```js
const resolvedPromise =  Promise.resolve();

const errorPromise = resolvedPromise.then(() => {
  throw new Error('Promise error');
}).catch(error => {
  console.log(error); // [Error: Promise error]
});
```

*Well that was easy!*

Yes, I like the syntax too. It makes it really clear what error we’re catching, and looking back over the chain you can check where it might have come from.

However, since errors thrown in a Promise don’t bubble up to the window you have to `catch` errors everywhere. You aren’t guaranteed that an error like `undefined is not a function`. As my co-worker put it, with Promises you “have to expect the unexpected everywhere.” All these `catch`es can also get messy and complicated.

### jQuery’s Deferred

On the other hand, an error thrown in a Deferred *will* bubble up to the window and can be caught along the way. Which means we can rewrite our previous example to catch the error:

```js
try {
  const resolvedDeferred = $.Deferred().resolve();
  const errorDeferred = resolvedDeferred.then(() => {
    throw new Error('Deferred error');
  });
} catch (error) {
  console.log(error); // [Error: Deferred error]
}
```

I’ll write it another way to reinforce the previous topic. Now we can see the settled state of each promise:

```js
const resolvedDeferred = $.Deferred();
const errorDeferred = resolvedDeferred.then(() => {
  throw new Error('Deferred error');
})

try {
  resolvedDeferred.resolve(); // triggers both promises to settle
} catch (error) {
  console.log(error); // [Error: Deferred error]
}
console.log(resolvedDeferred.state()); // "resolved"
console.log(errorDeferred.state()); // "pending"
```

Here you can see that `errorDeferred` still has the “pending” state, even though the error has been caught and handled.

*Ok, so using a normal try/catch works for Deferreds*

Not really.

*What?! You tricked me!*

I’m afraid I did. Remember at the beginning when I said my examples would use synchronous code to make things clearer? That’s what is making this example work. Since the `Deferred error` is thrown right away (without waiting for any aysnc code to execute) the `catch` happens right away too. It’s useful to prove the point that the `Deferred error` bubbled up, but not so good for showing how to handle Deferred errors. Let’s write another example:

```js
try {
  const resolvedDeferred = $.Deferred().resolve();
  const errorDeferred = resolvedDeferred.then(() => {
    setTimeout(() => {
      console.log('throw error'); // "throw error"
      throw new Error('Deferred error');  
    }, 20);
  });
} catch (error) {
  // this never runs because the catch won’t be triggered
  console.log('Does not run');
}
```

As you can see, now that we’re using async code the try/catch doesn’t work any more.

*Great, another way not to do it.*

Unfortunately, yes. The thing is, jQuery doesn’t give us a way to catch errors thrown from Deferreds. It’s just not possible.

*Not possible! But this is programming, there must be a way!*

Well, there is, upgrade to jQuery 3. While most of jQuery Deferred’s methods were defined by 1.12, one method, `catch`, was recently added when jQuery 3.0 came out (which happened on June 9, 2016). This new `catch` method means you can do the same kind of `catch` as we did with the Promise earlier. Unfortunately [very few](https://w3techs.com/technologies/details/js-jquery/all/all) websites are using jQuery 3 at the moment. Hopefully your site is one of them!

Ok, let’s look at the example for using jQuery’s catch:

```js
const resolvedDeferred = $.Deferred().resolve();
const errorDeferred = resolvedDeferred.then(() => {
  console.log('throw error'); // "throw error"
  throw new Error('Deferred error');  
}).catch(error => {
  console.log(error); // [object Error] {}
});

console.log(errorDeferred.state()); // "pending"
```

As you can see, we were able to `catch` the error from the Deferred in the same way we caught the error from the Promise. However, after throwing the error `errorDeferred` is left in a permanent “pending” state and will never settle to “rejected”.

*How can we move `errorDeferred` to be resolved?*

Unfortunately, we can’t; `errorDeferred` is doomed to be “pending” forever. If you try to call `errorDeferred.resolve()` you’ll get an error that `errorDeferred.resolve is not a function`.

*This all sounds like bad news. Are there any upsides?*

Remember earlier when we talked about Promises needing to explicitly `catch` all their errors, and how that can be annoying? Well, since Deferreds do bubble up errors to the window we can handle any error with one function: `window.onerror`.

Let’s rewrite it one more time to see how this would work:

```js
window.onerror = error => {
  console.log(error);
}

const resolvedDeferred = $.Deferred().resolve();
const errorDeferred = resolvedDeferred.then(() => {
  setTimeout(() => {
    console.log('throw error');
    throw new Error('Deferred error');  
  }, 20);
});

// Logs out:
// "throw error" (from line 8)
// "Uncaught Error: Deferred error" (from line 2)
```

Now any uncaught error will bubble up until it reaches the `onerror` directly on the `window`. From there our new function will log out the error. With one very small method we can see all the uncaught errors from every Deferred, rather than needing a `catch` on each one of them. **Warning:** the `onerror` works for every uncaught error anywhere in your code, not only for errors in Deferreds; you might find more than you bargained for!

---

And there you have it! Fairly small differences, but important ones. It might impact which promise implementation you decide on, and it will probably come up as you work with various libraries. It’s important to know if what you’re getting back is a Promise or a Deferred.

## Resources

Many thanks to my co-worker [Adam](https://twitter.com/typesthings) for initially pointing out the differences and then also reviewing my post and correcting my mistakes!

* [The Differences between jQuery Deferreds and the Promises/A+ spec](https://abdulapopoola.com/2014/12/12/the-differences-between-jquery-deferreds-and-the-promisesa-spec/)
* [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
* [Deferred object](http://api.jquery.com/category/deferred-object/)
* [Promise & Deferred Objects in JavaScript Pt.2: in Practice](http://blog.mediumequalsmessage.com/promise-deferred-objects-in-javascript-pt2-practical-use)
