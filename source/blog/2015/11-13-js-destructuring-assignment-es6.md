---
title: "JS: Destructuring assignment with ES6"
tags: js, es6

description: Using new features of ES6 to make variable assignment easier
keywords: js, es6, destructuring assignment, array
---

In my last post we talked about [enhanced object literals](/blog/2015/enhanced-obj-literals/) with ES6. This time around we’ll cover destructuring assignment, another bit of sugary syntax that’s available in ES6. Again, we’ll build up increasingly complicated examples.

## Vanilla JS

Since this is syntatic sugar, it’s possible to do everything with vanilla JS. We’re not introducing anything new here, just making existing things easier to do.

In vanilla JS we can assign array values to variables like this:

```
var a, b, c;
var arr = [1, 2, 3];

a = arr[0];
b = arr[1];
c = arr[2];

console.log(a); // logs 1
console.log(b); // logs 2
console.log(c); // logs 3
```

There’s nothing wrong with this, but it’s cumbersome and not quite as nice as...

```
let a, b, c;
let arr = [1, 2, 3];

[a, b, c] = arr;

console.log(a); // logs 1
console.log(b); // logs 2
console.log(c); // logs 3
```

Here you can see that `a`, `b`, and `c` were assigned based on the content of `arr`. It’s even easier to read when it’s written like this:

```
[a, b, c] = [1, 2, 3];
```

*That’s great, but what’s the __real__ code?*

You caught me, we can’t run the sugary code above directly in browsers yet. Since we need to put the code through a compiler it’s a good idea to see what actually gets run in the browser.

```
"use strict";

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var a = undefined,
    b = undefined,
    c = undefined;
var arr = [1, 2, 3];

var _arr = arr;

var _arr2 = _slicedToArray(_arr, 3);

a = _arr2[0];
b = _arr2[1];
c = _arr2[2];
_arr;
```

*Hmmm, not super readable... what’s with the `_slicedToArray` function?*

Well, it turns out you can do more complicated things with destructuring assignment, let’s look at some of those to better understand the compiled code. But keep in mind the line `_slicedToArray(_arr, 3);` - the `3` in particular will be important!

## Ignore the ends of an array

It’s also possible to ignore the last items of an array:

```
let a, b, c;
let arr = [1, 2, 3, 4, 5];

[a, b, c] = arr;

console.log(a); // logs 1
console.log(b); // logs 2
console.log(c); // logs 3
```

Here we didn’t care what the fourth or fifth items in the array were, only the first three items were of interest. With the longer array the compiled code now looks like:

```
"use strict";

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var a = undefined,
    b = undefined,
    c = undefined;
var arr = [1, 2, 3, 4, 5];

var _arr = arr;

var _arr2 = _slicedToArray(_arr, 3);

a = _arr2[0];
b = _arr2[1];
c = _arr2[2];
_arr;
```

Again, the line of interest is `_slicedToArray(_arr, 3);` and again the number of interest is `3`. Notice that although the array now contains five items the compiled JS knows we're only interested in the first three for assignment. That’s why the second parameter to `_slicedToArray` is still `3` rather than five.

## Ignore particular items

*OK, so far we can assign all the items in an array and just the first __n__. What else can this do?*

Let’s look at assigning only certain items.

```
let a, b, c;
let arr = [1, 2, 3, 4, 5];

[a,,b,,c] = arr;

console.log(a); // logs 1
console.log(b); // logs 3
console.log(c); // logs 5
```

Here we ignored items `2` and `4` from the array, but assigned the other elements. Again, nothing we couldn’t do with vanilla JS:

```
var a, b, c;
var arr = [1, 2, 3, 4, 5, 6];

a = arr[0];
b = arr[2];
c = arr[4];

console.log(a); // logs 1
console.log(b); // logs 3
console.log(c); // logs 5
```

But the ES6 way is a little bit shorter (and sweeter!).

## Assign “the rest”

A handy feature of ES6 is `...` which says “everything else.” We can use this for destructing assignment as well:

```
let a, b, c;
let arr = [1, 2, 3];

[a,...b] = arr;

console.log(a); // logs 1
console.log(b); // logs [2, 3]
```

And of course you can use it along with the other features:

```
let a, b, c;
let arr = [1, 2, 3, 4, 5, 6];

[a,,b,...c] = arr;

console.log(a); // logs 1
console.log(b); // logs 3
console.log(c); // logs [4, 5, 6]
```

## With objects

I’ve seen this feature used more with arrays than objects, but it is possible to use destructuring assignment with objects as well. Let’s take a look:

```
let obj = {cat: 'meow', dog: 'woof', mouse: 'squeak'};

let {cat, dog, mouse} = obj;
console.log(a); // logs 'meow'
console.log(b); // logs 'woof'
console.log(c); // logs 'squeak'
```

*Weird, I tried a version in the REPL and it didn’t work...*

I found the syntax for objects much less intuitive and picky than expected. Here are a couple of examples that __don’t__ work.

### Need the key names

This doesn't work:

```
let obj = {cat: 'meow', dog: 'woof', mouse: 'squeak'};

let {a, b, c} = obj;
```

This doesn’t work becuase object keys aren’t ordered. There’s no way for JS to know that you want `cat` to be first becuase there is no concept of “first” for objects.

This does work:

```
let obj = {cat: 'meow', dog: 'woof', mouse: 'squeak'};

let {cat: a, dog: b, mouse: c} = obj;
```

### Special syntax for pre-declare variables

This doesn’t work:

```
let a, b, c
let obj = {cat: 'meow', dog: 'woof', mouse: 'squeak'};

{cat: a, dog: b, mouse: c} = obj;
```

I was particularly confused about this. So I asked a [question](http://stackoverflow.com/questions/34836126/can-i-pre-declare-variables-for-destructuring-assignment-of-objects) about it and got an answer in no time (thank you Stackoverflow!).

Since there’s no keyword before the first `{` in the line `{cat: a, dog: b, mouse: c} = obj;` the `{` is interpreted as opening a new block, rather than being part of an assignment operation. To overcome this we need to tell JS to interpret the `{` as part of the assignment by giving more syntax. This does work:

```
let a, b, c
let obj = {cat: 'meow', dog: 'woof', mouse: 'squeak'};

({cat: a, dog: b, mouse: c} = obj);
```



## Usage: Function returns

A really cool use for this feature is to easily process multiple results returned from a function. (Python typically uses tuples for this.)

For example, a function can return multiple values:

```
function counting() {
    return [1, 2, 3];
}
```

And when it get’s called the return values can be quickly assigned:

```
[a, b, c] = counting();

console.log(a); // logs 1
console.log(b); // logs 2
console.log(c); // logs 3
```

*Well that’s pretty handy!*

## Resources

* A *bunch* of [examples](https://gist.github.com/mikaelbr/9900818)
* [Mozilla](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
* A more [in depth](http://fitzgeraldnick.com/weblog/50/) discussion