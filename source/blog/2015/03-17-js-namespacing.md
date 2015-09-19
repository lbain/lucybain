---
title: "JS: What is Javascript namespacing? How and where is it used?"
tags: js, interview-questions
---

## What is Javascript namespacing? How and where is it used?

*Well, what is namespacing?*

Namespacing is a way of organising your code. It organises concepts and ideas into a group and gives the group a **name.**

So rather than having everything dumped in together...

```
function bark() { /* ... */ }
function meow() { /* ... */ }
function wagTail() { /* ... */ }
function sleepAllDay() { /* ... */ }
function beHyper() { /* ... */ }
function purr() { /* ... */ }
```

...you group similar things together...

```
// Dog’s can...
function bark() { /* ... */ }
function wagTail() { /* ... */ }
function beHyper() { /* ... */ }

// Cat’s can...
function meow() { /* ... */ }
function sleepAllDay() { /* ... */ }
function purr() { /* ... */ }
```

...and then give the groups a name!

```
var dog = {
  bark: function() { /* ... */ },
  wagTail: function() { /* ... */ },
  beHyper: function() { /* ... */ }
};

var cat = {
  meow: function() { /* ... */ },
  sleepAllDay: function() { /* ... */ },
  purr: function() { /* ... */ }
};
```

Partly this is for ease of programming - it’s simpler to keep track of many things if they're grouped into smaller numbers. But it’s also really important for avoiding naming collisions.

*What are naming collisions?*

Let’s say I'm working on a big project and I get a little lost in the code sometimes. At some point I defined a `warningAlert` function. Then, a few weeks later, I forget that I had a `warningAlert` function defined already, and I define a new one lower down.

```
function warningAlert(text) {
  alert('Warning: ' + text);
}

/* ... */

function warningAlert(text) {
  alert('ALERT: ' + text);
}
```

Now calls to `warningAlert` will use the second definition since it overwrote (collided with) the first definition.

If I'd had a namespace for my `warningAlert` method I probably would have known where to look for the function definition. Something like:

```
var alerts = {}
alerts.warning = function(text) {
  alert('Warning: ' + text);
};
```

Namespaces aren't only for you (because I'm sure *you'd* never make a mistake like this... just for demonstration purposes, right?). They're also important when you start including code by a third party.

Since everything gets dumped into the global namespace there’s no way to know what you wrote and what was written by someone else. It’s generally a good idea to have a namespace for everything you wrote so you don't get naming conflicts with anyone else. Actually, jQuery does just that. All the jQuery functions are namespaced to `$`.

As for *how is it used?* I'll leave the implementation details up to [Kenneth Truyers](http://www.kenneth-truyers.net/2013/04/27/javascript-namespaces-and-modules/) since he did an excellent job listing out all your options.

**Resources**

* [Kenneth Truyers](http://www.kenneth-truyers.net/2013/04/27/javascript-namespaces-and-modules/)
* [Stackoverflow](http://stackoverflow.com/a/5947280/863846)
* [Angus Croll](https://javascriptweblog.wordpress.com/2010/12/07/namespacing-in-javascript/)

