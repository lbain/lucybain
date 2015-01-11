---
title: "JS: When would you use document.write()?"
tags: js, interview-questions
---

## When would you use `document.write()`?

First, what is `document.write()`?

As you might have guessed, `document.write()` writes to the document (a.k.a web page). It takes the content you want to write as a parameter. An invocation could look like this:

```
document.write("<h1>JS is awesome!</h1>");
```


**Problems with `document.write()`**

Try running the code above in the console of a web page (not this one!), go ahead, I'll wait.

You'll notice that it replaced the entire content of the `document` with the header `"JS is awesome!"`. Obviously that's a problem right there - `document.write()` shouldn't be used after the page has loaded to change the content as it will overwrite the entire page (probably not what you wanted to happen...).

`document.write()` doesn't work for XHTML pages. I've only been concerned with HTML so far, so I'm not too fussed about this one. But it might be more relevant in your case.

Some people think `document.write()` is a good solution for loading more files (JS or CSS) into the dom after the initial load. Turns out this is not the case, as this is slower than creating a new element (script or a css link) and inserting it into the page.

**Possible situations to use `document.write()`**

It seems that the only "approved" time to use `document.write()` is for third party code to be included (such as ads or Google Analytics). Since `document.write()` is always available (mostly) it is a good choice for third party vendors to use it to add their scripts. They don't know what environment you're using, if jQuery is or isn't available, or what your `onload` events are. And with `document.write()` they don't have to.

So don't use it yourself, unless your working for the third party.

**Resources:**

* [Stackoverflow](http://stackoverflow.com/questions/802854/why-is-document-write-considered-a-bad-practice)
* [MDN](https://developer.mozilla.org/en-US/docs/Web/API/document.write)
* [steve Souders](http://www.stevesouders.com/blog/2012/04/10/dont-docwrite-scripts/)
* [Quirksmode](http://www.quirksmode.org/blog/archives/2005/06/three_javascrip_1.html)









