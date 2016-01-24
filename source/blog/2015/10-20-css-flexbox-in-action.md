---
title: 'CSS: Flexbox in action - Bitbucket Server pull request header'
tags: css, hands-on, flexbox
---

I [recently wrote](/blog/2015/css-flexbox/) about using the `flex-box` rule in CSS. That was a practice round because I knew I needed to use flexbox at work in the future. Well, the time has come!

As you might know, I work for Atlassian on the [Bitbucket Server](https://www.atlassian.com/software/bitbucket/download) product. Today I spent some time implementing flexbox on our pull request page, specifically in the header. Let’s take a look at what it’s currently like:

![current pull request header](/images/blog/pr-header/current.png)

Adding flexbox is part of a much larger chunk of work, so my “finished product” looks like this:

![current pull request header](/images/blog/pr-header/rough-draft.png)

Obviously it’s got a ways to go, but this little bit is done! The main point is that we utilise all of the space available to us. Previously we were’t able to expand a branch name fully even though there was enough space for it.

## Description

I was fortunate enough to be able to throw away all existing HTML and CSS. Nothing else relies on this piece of code and I had full control of how to implement this part of the feature (with lots of feedback from my fantastic colleagues!). So we don’t need to talk about what *was* there, we’re starting from scratch.

### Desired outcome

The pull request header (known as PRH from now on) has X main sections:

1. author (avatar and name)
2. branch details (source, destination and an arrow between them)
3. PR status
4. reviewers (avatars only)
5. approve button
6. indication of merge issues
7. merge button
8. menu for other options

Ultimately only the author and branches should be “flexible.” Everything else should always be completely visible. After a little thought and discussion we decided that the branches should be more flexible than the author (i.e. branches should shrink faster than the author).

## Code

Ok, so now we understand the problem, let’s start coding!

**NOTE: to keep the CSS easy to read, the demo pages only work in Chrome.**

### Getting started

When I first got into it I figured I’d just work with everything all together. I already had the HTML set up from another bit of work, so I’d *just* add the CSS. This wasn’t successful. There were too many moving parts and I didn’t have a good enough understanding of how flexbox worked to hold all the parts in my head.

I followed the (very good) advice I give to people new to programming:

> It’s easier to get a small thing right.

Rather than think about the whole thing at once I focused on just the branch details section.

### Branch details

The branch details looks like this:

your-awesome-branch --> the-destination-branch

So I set up my HTML like this:

```
<div class="branch-details">
    <div class="source">
        your-awesome-branch
    </div>

    <div class="arrow">
        -->
    </div>

    <div class="destination">
        the-destination-branch
    </div>
</div>
```

(Obviously we use a better arrow really, but we’ll ignore that for this post.)

Alright, now we’re getting somewhere!

So `source` and `destination` ultimately need to be shrinkable. In order to allow them to shrink we need to make their container, `branch-details`, flexible.

```
.branch-details {
    display: flex;
}
```

At this point everything is flexible. So if you [play with it](/blog/2015/pr-header/simple-flexbox) you can see everything shrinks equally and the branch names wrap across lines. This wrapping makes sense for “normal” uses of flexbox (i.e. columns of text) but it isn’t what we want for the branch names.

We can stop words from wrapping with a quick `white-space: nowrap` rule. [This works](/blog/2015/pr-header/no-wrap) in that the words don’t wrap, but it has the unfortuante side effect of stopping things from shrinking. Let‘s put that back by hiding overflowing text: `overflow: hidden;`. While we’re at it, we can style the ending with an ellipsis using `text-overflow: ellipsis;`. Ok, we’re [back in business](/blog/2015/pr-header/ellipsis) now!

And that’s it for the branch details! The source and destination branches shrink equally while the arrow remains full width.

### Add the author

The other element that can shrink is the author. From the designs the author, branch details and PR status are all to the left, so I’ll group these all together in my HTML. We’ll add this next layer of wrapping to make sure the author can shrink, the PR status cannot shink, and the braches continue to shrink as expected.

[New HTML:](/blog/2015/pr-header/author-branches-status)

```
<div class="pr-info">
    <div class="author">
        Author name
    </div>
    <div class="branch-details">
        <div class="source">
            your-awesome-branch
        </div>

        <div class="arrow">
            -->
        </div>

        <div class="destination">
            the-destination-branch
        </div>
    </div>
    <div class="status">
        PR status
    </div>
</div>
```

Again, the author name needs to be flexible, so we’ll apply most of the same styles we did for the branch details to the `pr-info` section.

```
.pr-info, .branch-details {
    display: flex;
    white-space: nowrap;
}

.author, .source, .destination {
    overflow: hidden;
    text-overflow: ellipsis;
}
```

So we’re left with quite a good [base](http://localhost:4567/blog/2015/pr-header/author-branches-status-basic-flexible) of what we want. However, you’ll noice that if you start to shrink the screen too much the author gets complete hidden. We need a better way to keep the author at least somewhat visible, and actually we want to shrink the author slower than the branches (something like: for every 5px the branches shrink the author only shrinks 1px).

Well, keeping the author always somewhat visible is easy enough: we can just chuck a `min-width: 5em` on there so we don't accidentally hide the author completely. But now the branch details section doesn’t flex at all. WHY NOT??? Since the branches can flex down to nothing we’ll give the branch details a `min-width: 0`. (In real life the PRH has the same min-width as the page and won’t be able to shrink down to completely hide the branch details. For this post I’m not going to worry about the page shrinking too small.)

Ok, now we have both the author and the branch details shrinking, time to make that happen at different rates. Flexbox items have a `flex-grow` property which says how fast the items should grow; there’s also a `flex-shrink` property that, surprise, surprise, deals with how fast items should shrink. So we’ll make the branches shrink faster than the author by adding:

```
.author {
    flex-shrink: 1;
}

.branch-details {
    flex-shrink: 5;
}
```

The rates are fairly arbitrary, but easily changed if needed.

Here’s the [working version](/blog/2015/pr-header/author-branches-status-flexible) for you to play with.

### Put it in context

Finally we can add the rest of the PRH code in. As a reminder, that’s the: 
reviewers, approve button, indication of merge issues, merge button, and menu for other options. Thankfully all of these will be full width (no shrinking) and most will be a consistent size.

New HTML:

```
<div class="pr-header">
    <div class="pr-info">
        <div class="author">
            Author name that’s really long, like super duper long
        </div>
        <div class="branch-details">
            <div class="source">
                your-awesome-branch-with-a-reall-really-really-long-and-annoying-name
            </div>

            <div class="arrow">
                -->
            </div>

            <div class="destination">
                the-destination-branch-with-a-reall-really-really-long-and-annoying-name
            </div>
        </div>
        <div class="status">
            PR status
        </div>
    </div>
    <div class="pr-actions">
        <div>reviewers</div>
        <div>approve button</div>
        <div>merge issues</div>
        <div>merge button</div>
        <div>menu</div>
    </div>
</div>
```

Since we know we want the header to be flexible I’ll go ahead and add the basics in. Right now the `div`s in the `.pr-actions` are all displayed as block elements, so let’s line them up nicely. Here are the changes:

```
.pr-header, .pr-info, .branch-details {
    display: flex;
    white-space: nowrap;
}

.pr-info, .author, .source, .destination {
    overflow: hidden;
    text-overflow: ellipsis;
}

.pr-actions div {
    display: inline-block;
}
```

And [that’s it!](/blog/2015/pr-header/in-context)

### Safari

Except for Safari. Once I had the proper vendor prefixing in, everything worked as expected in all browsers (even IE!) but not Safari. This [bug](LINK HERE) might be the culprit, but I’m really not sure. If you have any knowledge about what’s causing this, I’m interested! Anyways, for whatever reason you need to add `flex-shrink: 0` to the things you don’t want to shrink. So for this we’ll add:

```
.arrow, .status, .pr-actions {
    flex-shrink: 0;
}
```

And with that it’s [Safari compliant!](/blog/2015/pr-header/in-context-safari)

## Done








