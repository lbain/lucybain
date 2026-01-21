---
title: 'JS: Async Google Adwords conversion'
tags: ["js", "google-adwords"]

featured: true
---

## How can I trigger a Google Adwords conversion when the page is loaded asynchronously?

I've been working with Google Adwords at work this week (yay learning!). My first task was to add a “tracking pixel” to a thank you page after a user has given us their contact details.

(Side note: It turns out we don’t really use pixels any more, we use JS to actually make the call, and only fall back to a pixel when the user doesn’t have JS enabled.)

Our thank you page is loaded asynchronously, so the Google Adwords script was getting injected into the dom in that async call. As it turns out, you can’t just inject scripts into the dom and expect them to run. If you do inject the script (as I did) you'll get this warning in Chrome:

```
Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.
```

(Personally I think this should be an error, not just a warning. To me, this is saying “Hey, your code that you think is running isn’t actually running” - that sounds like an error. But I digress...)

After some Googling around I know of two ways to fix this.

**Fix one (bad)**

Mess with `document.write`. Basically Chrome has a check that an async loaded script doesn’t make any calls to `document.write`. But it doesn’t check for `$('body').append()` (yet). So if you set `document.write` to actually use `$('body').append()` the error goes away. Here’s an example (taken from [Jakob Beyer](http://www.jakobbeyer.de/asynchronous-google-adwords-conversion-tracking)):

```
var oldDocumentWrite = document.write

// change document.write temporary
document.write = function(node){
    $("body").append(node)
}

// get script
$.getScript( "http://www.googleadservices.com/pagead/conversion.js", function() {
    // replace the temp document.write with the original version
    setTimeout(function() {
        document.write = oldDocumentWrite
    }, 100)
});
```

This threw up some red flags for me - why are we hijacking `document.write`? If we have to do this weird dance to get around the problem, maybe it’s as unsafe as Chrome would have us believe - should we do something safer?

Time to do some more Googling...

**Fix two (good)**

The correct way to deal with this problem is to use Google Adwords async script. I know it seems really simple and obvious, but I did find a lot of people suggesting the first way, so I’m hoping this post is news to some of you.

Here’s how to use Google’s async code:

On your main page (not anything that’s loaded asynchronously) link to the async conversion file.

```
<script type="text/javascript" src="//www.googleadservices.com/pagead/conversion_async.js" charset="utf-8"></script>
```

This way the `google_trackConversion` method is written on document load, and not async which caused the original warning we saw.

Then wherever your async call returns you can trigger a call to track the conversion:

```
<script type="text/javascript">
/* <![CDATA[ */
window.google_trackConversion({
  google_conversion_id: 123456789,
  google_conversion_label: "your label here",
  google_custom_params: {
    parameter1: 'abc123',
    parameter2: 29.99
  }
});
//]]>
</script>
```

**References**

* [Docs](https://developers.google.com/adwords-remarketing-tag/asynchronous/) for the good fix
* [Stack overflow answer](http://stackoverflow.com/a/25240908/863846) for the good fix
* [Bad fix](http://www.jakobbeyer.de/asynchronous-google-adwords-conversion-tracking)
