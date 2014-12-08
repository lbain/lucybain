---
title: 'JS: feature detection vs. inference vs. UA string'
tags: js, interview-questions
---

## What's the difference between feature detection, feature inference, and using the UA string?

Let's start smaller...

**What is feature detection?**

When you check if a certain feature exists, that's feature detection.

We need to write code that checks if features exist in JS since different browsers have different implementations, something like this:

```
var text;
if(typeof(Text) === "function"){
    text = new Text('Oh, how quick that fox was!');
} else {
    text = 'Oh, how quick that fox was!';
}
```

That means you can be confident you've covered all of your bases with different browser implementations.

**What is feature inference?**

When you make an assumption that because one feature is present (or not) another one will also be present (or not). (And you know what people say about when you assume something...)

The general thought process goes like this:

*Chrome implements the `Text` function. I also know Chrome doesn't have `applyElement` like IE does. So I'll write code like...*

```
if(typeof applyElement != 'undefined') {
    // now I know I'm not in IE, I'll just assume Text is available
    text = new Text('Oh, how quick that fox was!');
}
```

But oops! Someone looked at that code in Firefox which doesn't implement `applyElement` or `Text`! They got an error :(

So that's the problem. Since you're not checking for the feature you're using you're more likely to have inconsistencies. Also, if in the future one of the browsers changes what they implement all your assumptions will be inacurate.

So yeah, it's bad.

**What is the UA string?**

"UA" stands for user agent, which means the browser (and a whole lot of other stuff). Mine looks like this:

```
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71
```

(You can find your user string at [whatsmyuseragent.com](http://whatsmyuseragent.com/).)

But you can see in there (at the end) it says what browser I'm on. So it would be possible to check for a specific version of Chrome by "sniffing" the user agent string. This is generally considered bad practice (but seems to be slightly better practice than feature inference).

Just like with feature inference, if you use the UA string you're making an assumption about how the string will be written, what changes are likely to happen in this particular version, and that your code will be able to handle any future changes.

**TL;DR**

Use feature detection if you're working with a feature that isn't available across all browsers. When the browsers upgrade your code will be able to take advantage of the upgrade and your code will still work.

**Resources**

* [Feature detection is not browser detection](http://www.nczonline.net/blog/2009/12/29/feature-detection-is-not-browser-detection/)
* [Stack overflow answer](http://stackoverflow.com/a/20105161/863846)
* Mozilla's article on [working with the user agent](https://developer.mozilla.org/en-US/docs/Browser_detection_using_the_user_agent)