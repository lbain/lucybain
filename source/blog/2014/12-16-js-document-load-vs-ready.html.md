---
title: 'JS: document load vs document ready'
tags: ["js", "interview-questions"]

featured: true
---

## Difference between document load event and document ready event?

**`$(document).ready()`** fires when the HTML has finished loading. You can’t interact with the DOM before the HTML has finished loading, so we keep all our JS interactions wrapped up in the ready handler.

Note: The ready event is just for jQuery, so that’s a downside if you weren’t planning on including all of jQuery on your site.

**`window.onload`** fires when all of the content (images, scripts, CSS, the whole lot) has finished loading. This can be really slow, so we try not to keep too much here. But it can be useful if you need to work with images of unknown size.

And that’s it! This has been the most straight forward answer yet :)

**References**

* [Stackoverflow](http://stackoverflow.com/questions/3698200/window-onload-vs-document-ready)
* Another [stackoverflow](http://stackoverflow.com/questions/7971615/difference-between-pageload-onload-document-ready)
* There were a bunch more, but they all said the same thing.