8-12-yow-day-2.md
---
title: YOW! Day Two
tags:
published: false

description:
keywords:
---

Nice intro

### The Past and Future of Evolutionary Architecture, Rebecca Parsons

- Evolutionary architecture is a way to apply agile’s methods of iteration and feedback loops to architecture
- Changing large design decisions doesn’t need to be super scare when you’ve got a good test suite to check the change.
- Read Reactoring Databases LINK
- It’s irresponsible to do evolutionary architecture (and generally make risky decisions) without having good tests, CI, and CD. Otherwise it puts too much pressure on the ops team.
- Delay decisions until the last responsible moment. The longer you delay the more information you’ll have available. But you still need to be responsible about it - others shouldn’t suffer for your lack of decision.
- Develop a fitness function early on in a project. The fitness function should define ”good“ for this particular project by making boudries and requirements explicit.

> Good code has a more consistent definition across projects than good design.


### Adventures in Elm Questioning your principles, Jessica Kerr

> Elm considers every compile error as a teachable moment

- Live coding demo, gutsy! She also was really eplicit about what tools she used and how her system was set up. This was really helpful as you often have questions about a cool thing you saw them use.
- Elm:
    + Explicit types are optional, all items in a list must be of the same type
    + The language is aimed at people doing work and their experience. It’s not about building the “right” language.

> We shouldn’t have whitespace arguments, so there’s an auto formatter

> The compiler is my friend and it helps me get it *right*.

### If you are Synchronous you are not Resilient, Gregor Hohpoe

- Resilient - acknoledge things will fail, your system needs to be able to handle it and react to return to the normal state
- Fail-operational: the system has to continue working (perhaps with a degraded service) and cannot be restarted or crash out (think of an plane)
- Antifragile: something that becomes *stronger* with destirbances (a rumer, hydra)
    + Chaos Monkey: when the monkey finds a failure your can improve your system
    + 

### Communities of Practice: The Missing Piece of your Agile Organisation, Emily Webber

- 



> As all archetechts know, there’s somethig to be learned from everything.

> A list of ingredients isn‘t enough to make food, you need the recipe as well.




