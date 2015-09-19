---
title: "JS: Split vs. Splice"
tags: js, interview-questions
---

## What’s the difference between `split` and `splice`?

*Well, what does `split` do?*

Much like the name implies `split` breaks something into pieces. The `split` method is used for strings in JS. It has a few optional parameters, so let’s see what the simplest call does:

```
var myString = 'My test string';
console.log(myString.split()); // ['My test string']
console.log(myString); // 'My test string'
```

Hmmm, that’s not super useful - `split` called without a parameter simply creates an array with one element, the string. But note that calling `split` on `myString` doesn’t change `myString`.

Ok, let’s try something a little more interesting. I want to break `myString` up into whole words. We can split `myString` on spaces like this:

```
var myString = 'My test string';
console.log(myString.split(' ')); // ['My', 'test', ’string']
console.log(myString); // 'My test string'
```

Much more useful! When you call `split` with a parameter the string is *split* on every occurrence of that parameter. Note that the parameter itself is removed from the array (there are no spaces in `['My', 'test', ’string']`). Now we can know how many words are in a sentence, or find people’s first and last names (sometimes, names can get tricky...). Again, note that `myString` wasn’t changed.

But what if `myString` was really long? Maybe you don’t want an array with hundreds of items in it. Or perhaps you only want to find the first nonoccurence of something. Let’s look for the first two word in `myString`:

```
var myString = 'My test string';
console.log(myString.split(' ', 2)); // ['My', 'test']
console.log(myString); // 'My test string'
```

Again, we split on spaces because we were looking for full words. The second parameter we sent to `split` was the number of elements to go in the array. We wanted the first two words, so we sent through 2.

Overall `split` can be used to:

* wrap a string up in an array `string.split()`
* break up a string whenever a particular string is found `string.split(breakString)`
* return only a certain number of elements from all the break points `string.split(breakString, 3)`

Sweet, we're halfway there!

*So, what does `splice` do?*

The name isn’t great, but it’s related to **splicing** things together. Like you can take the end of one rope and splice it together with another. It’s a [real thing](https://www.google.com.au/search?q=splice+rope).

Anyways... in JS `splice` is an array method. Let’s look at a few sample calls:

```
var myArray = ['this', 'is', 'an', 'array'];
myArray.splice(0, 2); // ['this', 'is']
console.log(myArray); // ['an', 'array']
```

Ok, a really important thing to note is that `myArray` was changed during the call to `splice`. So if you ever want to use the original array you'll need to keep a backup somewhere. Another thing to note is that `splice` returns a value (in fact, it returns the elements that are missing from the array).

Also, `splice` requires at least two parameters. The first parameter is an index in the array. I think of it as where the cursor is. The second parameter is how many elements to delete. So what we're really saying is “from position **0** please remove **2** elements and return them to me.”

Let’s look at a similar example:

```
var countingArray = [5, 6, 7, 8];
countingArray.splice(1, 1); // [6]
console.log(countingArray); // [5, 7, 8]
```

What we said was “from position **1** please remove **1** element and return it to me.”

> Note: JS doesn’t have a `.delete(index)` for arrays. The best you can do is `delete array[index]`, but that actually just replaces the value at `array[index]` with `undefined`. Using `splice` in the above example is how you can actually delete elements from an array.

Alright, on to the optional parameter(s)!

```
var myArray = ['this', 'is', 'an', 'array'];
myArray.splice(3, 0, 'awesome'); // []
console.log(myArray); // ['this', 'is', 'an', 'awesome', 'array']
```

Hopefully you've got a good idea of what happened here. The first parameter is still an index. The second parameter is still how many elements to remove. And finally the third element is what to add **after** the index given in the first parameter. Again, what we're really saying is “from position **3** please remove **0** elements, then **after** position **3** please add **'awesome'**.”

Another example:

```
var myArray = ['this', 'is', 'an', 'array'];
myArray.splice(3, 0, 'amazingly', 'awesome'); // []
console.log(myArray); // ['this', 'is', 'an', 'amazingly', 'awesome', 'array']
```

What we said was “from position **3** please remove **0** elements, then **after** position **3** please add **'amazing'** and **'awesome'**.” The third parameter can keep on going. If you wanted to add 100 elements to `myArray` you could do it with `splice`.

Finally, you can also switch words in place:

```
var myArray = ['this', 'is', 'an', 'array'];
myArray.splice(2, 1, 'the'); // ['an']
console.log(myArray); // ['this', 'is', 'the', 'array']
```

What we said was “from position **2** please remove **1** element and return it to me, then **after** position **2** please add **'the'**.”

Overall `splice` can be used to:

* remove elements by index
* add elements after an index
* add and remove in one step

Phew! Thanks for sticking with me - this was a long one!

**Resources**

* [Mozilla (split)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
* [Mozilla (splice)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
* [split vs. splice](http://ariya.ofilabs.com/2014/02/javascript-array-slice-vs-splice.html)

