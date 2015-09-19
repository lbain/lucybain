---
title: 'JS: host vs. native objects'
tags: js, interview-questions
---

## What’s the difference between host objects and native objects?

I didn't find as much lot of information about this topic as some of the other [JS interview questions](https://github.com/darcyclarke/Front-end-Developer-Interview-Questions#js). So here’s my current understanding, but please comment if I've misunderstood or there’s a better way to explain it.

__What is a native object?__

Native objects are inherent to JS - they are available to you so long as you're using JS. You can be in the browser or in Node, but if you're writing JS, you've got access to the native objects. Here’s a [list](http://es5.github.io/#x8) of them if you want to know what’s available to you.

__What is a host object?__

Everything the environment gives you. For the browser, this includes objects like `window`. Host objects can differ by environment (or host), so that Node wouldn't have access to `window` (which makes sense since there’s no DOM for Node), but could have its own host objects like `NodeLists`.

__What is a user object?__

This is where I got the most confused. The question asks for the difference between __host__ and __native__ objects, which was covered on a few sites. However, a couple of sites make a third category: __user__ objects. There seems to be some debate about user objects being their own category. I'm not sure which side is right so I'm adding a little blurb about them here, but please ignore if it’s not relevant.

User objects are anything the user defines. When you create a new object that is not directly a native object, you've made a user object. So if you create a new string (`"Hello world"`) you created a native object, but if you create an instance of an object you've defined (`"new Cat()"`) then it’s a user object.

__References__

* [stackoverflow questionn](http://stackoverflow.com/questions/7614317/what-is-the-difference-between-native-objects-and-host-objects)
* [Programmer Inner Voice](http://programmerinnervoice.wordpress.com/2013/07/22/host-objects-vs-native-objects/)
* [Sitepoint](http://www.sitepoint.com/oriented-programming-1-4/) which also mentioned user object as a separate category, although it was posted way back in 2001
* and [Perfection Kills](http://perfectionkills.com/extending-native-builtins/), although this one was less on topic


