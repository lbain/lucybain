---
title: "JS: Promises/A+ and. jQuery history"
tags: ["js", "promise"]

description: A look into why we have two promise definitions.
keywords: javascript, promises/A+, jquery, promise, history
---

In my [last post](/blog/2016/js-promises-vs-deferred/) I listed a bunch of confusing things about promises. That time I clarified “deferred” and “promise” and this time I’ll start writing about Promises/A+ and jQuery’s promises.

## Promise or promise?

The concept of a promise has been around for a long time ([1976](https://en.wikipedia.org/wiki/Futures_and_promises) in fact). Promises/A+ and jQuery’s promises are both implementations of the promise concept. They both represent future values and both simplify programming with async operations.

*So how’d we get two of the same thing?*

Well, they’re not actually the same thing, but we’ll briefly talk about the history first.

## Why do we have two?

JS got [promises](http://www.ecma-international.org/ecma-262/6.0/#sec-promise-objects) with ECMAScript 6, which is slowly making it’s way into [browsers](http://caniuse.com/#feat=promises). But before the spec was settled (see what I did there?) jQuery got to work on an implementation. jQuery knew browsers weren’t going to support promises right away, and, as with other shiny new JS, developers would have to rely on a library or polyfill to use the new features. (Other libraries knew this as well and did similar things to jQuery, but jQuery is the most common, so we’re talking about it.)

I like to think it went something like this:

**Developers:** We’d like to use promises in JS

**JS spec:** Hmmm, interesting idea... yeah, let’s do that

**jQuery:** *typing, developing, debugging*

**JS spec:** But *how?* Let’s really think about what should happen.

**jQuery:** *typing, developing, debugging*

**JS spec:** *Debating, email threads, thinking*

**jQuery:** Here you go!

**JS spec:** *Debating, email threads, thinking*

**Developers:** Thanks jQuery, we’ll get right on it!

**JS spec:** Here’s the theoretical description of what should happen.

**jQuery, developers, and JS spec:** Well this is awkward.

So before the official JS specification for promises (eventually called Promises/A+) had landed we had an implementation for promises in jQuery. This was super handy for developers then since it meant they could have all the advantages of promises as soon as jQuery allowed it. The problem is that jQuery’s implementation and Promises/A+ differ. And it’s not likely that either will change any time soon.

With a bit of effort jQuery’s promises and Promises/A+ can play nicely together, but that effort wasn’t made in the past since the Promises/A+ weren’t even available at the time. There’s also the mental effort involved in knowing both ways of working with the promises and knowing what type of promise you’re working with at any given time.

It’s not ideal, but it’s the world we live in.

Next time we’ll talk about the differences between the Promises/A+ spec and jQuery’s implementation of promises so you know what to watch out for.


