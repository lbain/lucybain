---
title: "CSS: What is Block Formatting Context (BFC)?"
tags: css

description:
keywords: css, block formatting context, bfc
---

Time for the next CSS interview question from the list of [front end interview questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions#css-questions). My goodness that repo has a LOT of questions to get through!


## What is Block Formatting Context (BFC)?

It seems that BFC is something that I’ve always assumed was part of how floats worked, and hadn’t realised was it’s own concept with a name. So if you’ve been playing with floats for a while (or if you’ve upgraded to [flexbox](/blog/2015/css-flexbox/)) then this probably won’t be interesting to you. But hey - it’s always good to understand things more deeply!

<style>
.container {
    background-color: #FF7400;
}
.box-1 {
    background-color: #F55585;
}
.box-2 {
    background-color: #00CFCF;
}
</style>

From [MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context):

> A block formatting context is a part of a visual CSS rendering of a Web page. It is the region in which the layout of block boxes occurs and in which floats interact with each other

*Yawn, what was that?*

Ok, so a block formatting context is an area where block boxes and floats go. I think of it as a containing element that has flow rules (so the block boxes are, well, block-y) and hard boundaries (so the floats don’t leave the container). Ultimately the page is a block formatting context, but you can have a bunch in a page. Actually, you can have BFCs in BFCs, Inception style. While that sounds cool (I mean, I just talked about Inception in a CSS post - that’s gotta count for something!), that’s what most of HTML and CSS is (`div`s within `div`s).

*Ok, so you’re telling me BFCs are totally normal CSS and nothing particularly interesting.*

Well, yes, but they also have some handy features. Let’s talk about them now.

Block formatting contexts:

* stop margins from collapsing
* restrain floats
* contain floats

### Block formatting contexts stop margins from collapsing

What normally happens?

<style>
.margin {
    margin: 20px;
}
</style>

<div class="container">
    <div class="margin box-1">
        This div has a 20px margin around it.
    </div>
    <div class="margin box-2">
        So does this one.
    </div>
</div>

Since both of those `div`s have 20px of margin around them you’d expect to see 20px of margin at the top and bottom as well. But actually there’s no margin there, that’s because CSS automatically collapses margins.

Now let’s check it in a block formatting context:

<style>
.block-formatting-context {
    overflow: hidden;
}
</style>

<div class="container block-formatting-context">
    <div class="margin box-1">
        This div has a 20px margin around it.
    </div>
    <div class="margin box-2">
        So does this one.
    </div>
</div>

Boom! See all that extra margin at the top and bottom? That’s because of the block formatting context! Now, in case you don’t feel like looking at the source, I made the containing `div` a BFC by giving it `overflow: hidden;`. Simple :)

### Block formatting contexts restrain floats

Here’s what it looks like normally:

<style>
.float {
    float: left;
}
</style>

<div class="container">
    <div class="float box-1">
        This div is floating left
    </div>
    <div class="box-2">
        This one is <b>NOT</b> floating. It’s got a lot of words in it. This div is probably your main section.
    </div>
</div>

That’s probably not what you want your two column layout to look like. Don’t worry, we can fix it!

Here it is with block formatting context properly enabled:

<style>
.block-formatting-context {
    overflow: hidden;
}
</style>

<div class="container">
    <div class="float box-1">
        This div is floating left
    </div>
    <div class="box-2 block-formatting-context">
        This one is <b>NOT</b> floating, it is a <b>block formatting context</b>. It’s got a lot of words in it. This div is probably your main section.
    </div>
</div>

As you an see, this ability makes BFCs really handy for doing column layouts.

### Block formatting contexts contain floats

Here’s what it looks like normally:

<style>
.float {
    float: left;
}

.border {
    border: 2px solid black;
}
.clearfix {
    clear: both;
}
</style>

<div class="container border">
    <div class="float box-1">
        This div is floating left
    </div>
    <div class="float box-2">
        This one is too.
    </div>
</div>
<div class="clearfix"></div>

This time we’re trying to wrap two floated elements in a border. Obviously it didn’t work as expected. It’s actually worse than that. I had to add an invisible `div` with `clear: both;` (typically called a “clearfix”) before this paragraph to make sure the line breaks work properly. We shouldn’t need to do that!

Now we’ll add block formatting context:

<style>
.block-formatting-context {
    overflow: hidden;
}
</style>

<div class="container border block-formatting-context">
    <div class="float box-1">
        This div is floating left
    </div>
    <div class="float box-2">
        This one is too.
    </div>
</div>

Woot! Two boxes floating next to each other with a border around them and without using a clearfix. All by using a block formatting context!

## Resources

* [MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context)
* [VG Tech](http://tech.vg.no/2013/09/26/css-block-formatting-context/)
* [Max Design](http://maxdesign.com.au/jobs/sample-block-formatting-context/index.htm) - this one was particularly useful since it has a bunch of examples
* [YUI](http://yuiblog.com/blog/2010/05/19/css-101-block-formatting-contexts/)




