---
title: "JS: promise and deferred"
tags: js, promise

description: A breakdown of what Javascript’s promise and deferred represent with examples to clarify.
keywords: javascript, promise, deferred
---

I’m struggling with promises. A lot.

One of the things that’s super confusing about promises is the jargon associated. We’ve got all kinds of things: promise, deferred, Promises/A+, jQuery promise, fulfil, settle, reject, resolve, fail, catch, then, done, and probably others I don’t know yet. It was only *today* that I realised promises and deferreds aren’t the same thing. And that **p**romise and **P**romise aren’t the same thing. Programming is hard.

### promise vs. deferred

Anywhoo, I found this really great article [Promise & Deferred objects in JavaScript](http://blog.mediumequalsmessage.com/promise-deferred-objects-in-javascript-pt1-theory-and-semantics). Chris’s approach of taking some time out to think about promises and deferreds *without* code samples helped clarify things. He was also was very careful about which words he used when, so the post is far more consistent than others I’ve read (and I’ve been reading a lot recently...).

In that article is one paragraph in particular that helped me

> A promise is a placeholder for a result which is initially unknown while a deferred represents the computation that results in the value. Every deferred has a promise which functions as a proxy for the future result. While a promise is a value returned by an asynchronous function, a deferred can be resolved or rejected by it’s caller which separates the promise from the resolver. The promise itself can be given to any number of consumers and each will observe the resolution independently meanwhile the resolver / deferred can be given to any number of producers and the promise will be resolved by the one that first resolves it. From a semantic perspective this means that instead of calling a function ( callback ), we are able to return a value ( promise ).

I’ll be honest, I’ve read that paragraph 15-20 times by now, trying to tease out meaning from each line. So I rewrote it in my own words, and threw in some examples for good measure.

Here’s my breakdown:


> A promise is a placeholder for a result which is initially unknown while a deferred represents the computation that results in the value.

Promises represent a future value. At the moment of its creation, a promise doesn’t know what its ultimate value will be. Kind of like how the judges didn’t know what the artist’s final picture will be [when she started painting](https://www.youtube.com/watch?v=OetrSxmFZSI).

A deferred is the work that must take place in order for a promise to “settle” (that is, for the promise’s ultimate value to be available). Like the action of painting that the artist needs to do before the judges could see the final product.

> Every deferred has a promise which functions as a proxy for the future result.

When the deferred’s work kicks off it immediately returns a promise which represents the final value of the deferred’s work. This is similar to accepting a job (initialising a deferred) agreeing on a wage (the unsettled promise that is immediately returned by the deferred), doing the work (resolving the deferred), and then getting paid (resolving the promise).

> While a promise is a value returned by an asynchronous function, a deferred can be resolved or rejected by it’s caller which separates the promise from the resolver.

Deferreds must be explicitly “fulfilled” by other parts of the code (that is, the deferreds’ work must be completed), or they will remain in an “unfulfilled” state forever (incomplete). If this happens, the deferred’s associated promise will never settle. A deferred can fulfil in a section of the code that is unrelated to how and when its promise is referenced and used.

> The promise itself can be given to any number of consumers and each will observe the resolution independently.

A promise can have many listeners that are all updated with the final value of the promise when the promise settles. (Ready for this example? It’s my favourite!) Hermione’s [coins](http://harrypotter.wikia.com/wiki/Dumbledore's_Army_coin) for Dumbledore’s Army: Harry set his one coin (settled the promise) and all the other coins updated accordingly (many listeners for the same promise). Boom.

> Meanwhile the resolver / deferred can be given to any number of producers and the promise will be resolved by the one that first resolves it.

The same deferred can be passed to multiple functions (producers). Since it’s all the same deferred any one of these producers can fulfil the deferred. Once this happens the deferred is fulfilled for all the producers (and the single associated promise is settled as well).

> From a semantic perspective this means that instead of calling a function ( callback ), we are able to return a value ( promise ).

Promises can be returned and treated like a value, even though the value is not yet know.

- - -

That’s all for now, but I’m planning to write more posts about the rest of those words from the beginning. At least promises are giving me plenty of content!

