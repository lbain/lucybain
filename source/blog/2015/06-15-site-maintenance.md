---
title: Periodic site maintenance
tags: webmaster

description:
keywords:
---

Every now and then I spend some time going through my site to make sure things are working as expected. I might [tweak something](https://github.com/lbain/lucybain/commit/98e7b6787934045a546114bfed96b41ac9f95bcb), make some [SEO updates](https://github.com/lbain/lucybain/commit/33d8e3adc537b885905a1fa66b75b85921cf2011), [refactor](https://github.com/lbain/lucybain/commit/f4aa1b6185b947abc9841273b3a518d0326411d4) messy code, or [fix something](https://github.com/lbain/lucybain/commit/8ea1b51a6d790effd008a4511ffe379288efaacb) that was broken. Ususally days like this are pretty unstructured. I’ll be honest, they typically happen when I don’t feel like writing a blog post, but I still think these days are valuable. After all, this blog is like any piece of code - it needs constant love and attention or it will turn to legacy code. (Shudder)

The point of this post is to write down some ideas of what I can do for maintenance so when I have a day like this I don’t spend too much time waffling.

## Links

Links go bad. Hopefully not my internal ones (although that’s happened before) but certainly the external ones can just disappear whenever they want to. Unfortunately Middleman doesn’t have [broken link checks](https://github.com/middleman/middleman/issues/902) on build. That’d be quite handy since I’d get an update when a link broke. However, there are a [lot of sites](https://www.google.com/search?q=spider+site+for+broken+links&oq=spider+site+for+b&aqs=chrome.1.69i57j0l4.3126j0j4&sourceid=chrome&es_sm=119&ie=UTF-8) to help you find broken links. I used [Broken Link Check](http://www.brokenlinkcheck.com/) and it worked just fine.

## SEO

The suggestions around what you should and shouldn’t do for SEO seem to constantly change. It’s not something I’m particularly interested in, so I’m happy for someone to tell me what’s currently “right.” I used [SEO SiteCheckup](http://seositecheckup.com/) to see what I was missing. Unforunately I didn’t have metadata associated with most of my posts, so now an ongoing task is to go back through old posts and add those.

I’ve also learned that the name of the post is really important. Not surprising since it’s the title of the page, but I didn’t know as much about naming when I started (nor do I always think of the best SEO friendly title at the time). I also go back and rename some posts as needed. In order to reduce hard coded redirect listings I now use [Middleman::Alias](https://github.com/Octo-Labs/middleman-alias) to keep rename my posts.

## Code Improvements

There’s always something that will make the code a little nicer to work with. I spent a fair bit of time working on refactoring my Sass a while back and it’s really paid off. I’m not so scared to make style changes and I have a better understanding of CSS. So taking the time to improve the code that backs the site means that I’m better able to continue maintaining it.

Some ongoing things to improve:

* Sass, it seems to degrade remarkably quickly
* The code Middleman uses to run the site (`config.rb`)
* Convert haml to markdown - when I started this blog I was more comfortable in haml than markdown. I’ve since changed my mind and would like to update the old haml pages to markdown.

## Usability

This is probably the most fun one, but I never really get around to it. Anything that can improve the user’s experience is worth it. How best to test this? By reading my old posts! I’m constantly amazing by how many people find this site helpful, and I’m always looking for suggestions on how to make a post clearer. Even if no one asks a question in the comments, I usually find some errors by reading over what I wrote. Perferably something I wrote long enough ago to have forgotten the wording I used.

I write this blog for me - to help me learn things and better think through topics. But I *love* that other people find it helpful and I want them to have a good experience. One example of this was my [very](https://github.com/lbain/lucybain/commit/ea42c6ea4b2983335f903edda5cba3c49ff77df4) [long](https://github.com/lbain/lucybain/commit/0d21a940c235916211e3d06534702edc4f2f3255) [day](https://github.com/lbain/lucybain/commit/cd55113c3dd2cb7b9f26a105a5bbd9472d344224) converting to [smart quotes](http://smartquotesforsmartpeople.com/). I hope someone out there appreciates the update :)

Well, future me, I hope you found that list useful. Now get to work - if you’re not going to write a new post at least make the site better!