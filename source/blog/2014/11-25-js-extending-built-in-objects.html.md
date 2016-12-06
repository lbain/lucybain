---
title: "JS: don’t extend JS objects"
tags: js, interview-questions
---

## Why is extending built in JavaScript objects not a good idea?

Turns out there’s lots written on this topic (lucky for me!), be sure to check out the references section at the end.

**What is “extending an object”?**

When you add functionality to an object using the `prototype`. An example looks like this:

```
Array.prototype.first = function(){
    return this[0];
}

var temp = [1, 2, 3];
temp.first(); // returns 1
```

At first glance, this seems like such an awesome feature. Want the third element from an array? Extend Array! Want strings to have a `titleize` method? Extend String! Want `alphabetisedProperties` available for objects? Extend Object!

**Why is this a bad thing?**

It depends on who you ask. This is one of those “JS standards” - unlike most of the questions that have a clear answer, this one has a bit more opinion.

The main argument against doing this is: if, in future, a browser decides to implement its own version of your method, your method might get overridden (silently) and the browser’s implementation (which is probably different from yours) would take over. So not extending in the first place is future proofing your code.

On the flip side, if you decide to overwrite the browsers definition, any future developer working on your code won’t know about the change. They'll have a harder time getting up to speed.

Generally it’s safer to move your particular changes into a library (as with [underscore.js](http://underscorejs.org/)). That way your particular methods are clearly marked and there’s no chance of conflict.

**But...**

It might be a good idea to add an extension for functionality that became available in later versions, but isn’t guaranteed to be available in your particular browser. You can read more about this kind of polyfill on [Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter#Polyfill).

**References**

* [Perfection Kills](http://perfectionkills.com/extending-native-builtins/)
* [Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter#Polyfill)
* Google is [against](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml?showone=Modifying_prototypes_of_builtin_objects#Modifying_prototypes_of_builtin_objects) it
* More on what [extending objects](http://www.kirupa.com/html5/extending_built_in_objects_javascript.htm) is




