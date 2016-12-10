---
title: "JS: event delegation"
tags: js, interview-questions
---
I’m continuing my JS learning and found a list of [front end interview questions](https://github.com/darcyclarke/Front-end-Developer-Interview-Questions). There’s a section devoted to JS on there for me to work through. If they’re important enough to know in an interview, they’re important enough for me!

## Explain event delegation

Well I’m glad you asked! As it turns out we covered this topic in my [JS study group](http://codesydney.com/2014-js/) when I wrote my [Tic Tac Toe game.](/code-sydney-work/tic-tac-toe/)

Event delegation is when you bind an event listener to a parent (or ancestor) element rather than the element(s) you are particularly interested in. When the event is triggered you can check the event target to make sure it was actually the triggered on the element of interest. In general this would be inefficient as you’re now listening to events on the parent, and have to filter out any that aren’t on the particular element of interest. However, event delegation is particularly useful when you have many siblings (or decedents of the ancestor) that you’re interested in.

A simple example is as follows:

```
<ul>
  <li> First list element </li>
  <li> Second list element </li>
  <li> Third list element </li>
</ul>
```

While it would be possible to bind to the individual `li` elements it would require 3 listeners. Using event delegation it is possible to bind one event listener to the `ul` element and just check if the event’s target is an li element (very likely in this case...).

For my Tic Tac Toe game I listened to all click events on the board, and then checked the particular cell they clicked on, rather than listening for events on all the cells at once.