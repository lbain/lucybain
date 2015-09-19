---
title: 'JS: AMD and CommonJS'
tags: js, interview-questions
published: true
---

## What's the difference between AMD and CommonJS?

**Disclaimer:** I'm only going to talk about how this impacts the browser. I will not talk about Node.js, although I know it's relevant to this discussion. I don't know enough about Node.js to cover it properly. Ok, let's get to it!

To start off, let's talk about their similarities.

*What problem are they trying to solve?*

Typcially JS relies on having `<script>` tags in the right order in the HTML. This can often lead to confusion and ordering mistakes. Beyond that, some people prefer to have all their JS compiled into one massive file. This is convenient since they have complete control on ordering and don't need to rely on `<script>` tags. However it means all JS gets loaded on each page, which isn't very performant.

Both AMD and CommonJS are a way of linking JS bits of code, called modules, together. They are a way of defining which modules rely on which other modules so a computer can decide the best way to link everything together, rather than relying on error-prone coders.

*How do they solve that?*

Both AMD and CommonJS provide standards for other libraries to implement. There are quite a few libraries that have done just that ([RequireJS](http://requirejs.org/) and [Almond](https://github.com/jrburke/almond) are two that implement AMD). But you "use" AMD or CommonJS code any more than you can "use" object oriented code.

*Ok, so that's how they're similar. How are they different?*

Let's look at each one individually. We'll start with AMD:

*What does "AMD" stand for?*

AMD stands for **A**synchronous **M**odule **D**efinition.

*And what makes it special?*

The "module" part should be clear enough since both CommonJS and AMD focus on linking modules together. And the "definition" part is about how it's a standard, rather than a library. However a key difference for AMD is the "asynchronous" bit. AMD loads each distinct module asynchronously for web performance. Instead of having one *giant* file with everything in it which causes a slow load time, you can load only the files you need, only when you need them, all asynchronously. Slick, huh?

*So then what's special about CommonJS?*

CommonJS loads modules synchronously. My understanding is that this is better for server-side (Node.js) development. Again, CommonJS is a standard but it focuses more on JS out of the browser than AMD.

*That's it? Async vs. Sync?*

Sort of. Of course the syntax for both is different too. Let's look at how to use each.

## Syntax

**CommonJS**

We'll start with CommonJS since it's a bit easier to read.

*Part 1: math module*

```
// math.js
var module = {
  add: function(x, y) {
    return x + y;
  },
  subtract: function(x, y) {
    return x - y;
  },
  multiply: function(x, y) {
    return x * y;
  },
  divide: function(x, y) {
    return x / y;
  }
};
export.math = module; // export is a commonJS specific method
                      // export returns what's publicly available
                      // the "math" gives the name of the module
```
This code doesn't output anything, but when we require the `math` module we'll have access to everything in the returned `module` object (namely `add`, `subtract`, `multiply`, and `divide`).

*Part 2: stats module*

Alright, now we've created a module, we can require it in another module.

```
// stats.js
var math = require('math');

var module = {
  average: function(x, y) {
    var sum = math.add(x, y);
    return math.divide(sum, 2);
  }
};
export.stats = module; // export is a commonJS specific method
                       // export returns what's publicly available
                       // the "stats" gives the name of the module
```

*Part 3: get output*

Now we've got two modules, we can use them to get output.

```
var math = require('math');
var stats = require('stats');
console.log(math.add(1, 2)) // logs "3"
console.log(stats.average(0, 4)) // logs "2"
```

**AMD**

We'll go through exactly the same example, but this time implement it with AMD.

*Part 1: math module*

```
define( // AMD specific method used to define a module
  'math', // name of the module (this is optional)
  // Note: no dependencies (they're optional)
  function() {
    var module = {
      add: function(x, y) {
        return x + y;
      },
      subtract: function(x, y) {
        return x - y;
      },
      multiply: function(x, y) {
        return x * y;
      },
      divide: function(x, y) {
        return x / y;
      }
    };
    return module; // returns what's publicly available
});
```
As with CommonJS, this code doesn't output anything.

*Part 2: stats module*

```
define( // AMD specific method used to define a module
  'stats', // name of the module (this is optional)
  ['math'], // dependency, same name as module above
            // it's an array since there can be more than one
  function() {
    var module = {
      average: function(x, y) {
        var sum = math.add(x, y);
        return math.divide(sum, 2);
      }
    };
    return module; // returns what's publicly available
});
```

*Part 3: get output*

```
require( // AMD specific method to run code
  // Note: no name, require doesn't support names
  ['math', 'stats'], // dependencies
  function(math, stats) {
    console.log(math.add(1, 2)) // logs "3"
    console.log(stats.average(0, 4)) // logs "2"
});
```

**Resources**

* [Relation between CommonJS, AMD and RequireJS?](http://stackoverflow.com/questions/16521471/relation-between-commonjs-amd-and-requirejs)
* RequireJS on [AMD](http://requirejs.org/docs/whyamd.html)
* [About CommonJS](http://0fps.net/2013/01/22/commonjs-why-and-how/) and using it on the browser
* [About AMD](http://addyosmani.com/writing-modular-js/)
* A bit about [CommonJS vs. AMD](http://blog.millermedeiros.com/amd-is-better-for-the-web-than-commonjs-modules/)
* A little history about the [development of both](http://www.cubrid.org/blog/dev-platform/toward-javascript-standards-commonjs-and-amd/)