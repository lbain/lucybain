---
title: "JS: How does ajax work?"
tags: js, interview-questions
---

## How does AJAX work?

Let's start smaller: **What does AJAX stand for?**

**A**synchronous **J**avaScript **a**nd **X**ML (I think using the "a" in "and" is a little bit of a cheat, but there you go.)

*So how does it work?*

After loading, the client uses **J**avaScript to fire off a request to the server and listens to the response **a**synchronously. The response that comes back can be **X**ML, but is often other formats, most often JSON (officially this is known as AJAJ, but everyone still calls it AJAX).

The bit that makes AJAX so powerful is that it can update the page *after* it has finished loading. Before AJAX any new content required an entire page refresh, even if it was only a small change. This meant that users had to redownload a page for very little updated content (especially annoying in the 90s since home internet wasn't as fast then). Using AJAX meant that the front end could change without a full page refresh, thus giving a much faster response time.

Origially AJAX mostly returned HTML/XML snipits and the DOM would get updated with this new code when the AJAX returned. Now, however, it's more common for AJAX to get data and update the DOM as needed rather than doing a swap.

**Resources**

* [Wikipedia](http://en.wikipedia.org/wiki/Ajax_%28programming%29)
* [Stackoverflow](http://stackoverflow.com/questions/1510011/how-does-ajax-work)
* [Mozilla](https://developer.mozilla.org/en-US/Learn/What_is_AJAX_and_how_does_it_work)

