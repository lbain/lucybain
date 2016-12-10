8-12-yow-day-1.md
---
title: YOW! Day One
tags:
published: false

description:
keywords:
---

Nice intro

### The Scribe's Oath, Robet Martin (Uncle Bob)

“Uncle Bob” started his talk with a call to gender diversity by asking everyone to stand and then asking the men to sit down. As a person left standing it was pretty disapointing - certainly less than 20%, possibly less than 10%.

Programmers are the scribes of the modern world. Just like the scribes in ancient times, we have special knowledge about how the world works and how to change it. Having this much power means we will, at some point, become a regulated profession (like doctors and lawyers). Let’s jump the gun and regulate ourselves before gov’t gets involved.

Suggested programmer’s oath:

+ I will not produce harmful code. (Both in how it works and what it does. Things like not catching errors without handling them.)
+ The code that I produce will always be my best work. I will not knowingly allow code that is defective either in behavior or structure to accumulate. (Employers and the world expect we’re doing our best work all the time. Although it’s epected that what we write will “rot” a.k.a. become tech debt, it’s also expected that we will correct these problems.)
+ I will produce, with each release, a quick, sure, and repeatable proof that every element of the code works as it should. (Probably a test suit, but possibly something else.)
+ I will make frequent, small, releases so that I do not impede the process of others. (Your work shouldn’t negatively impact the work of others.)
+ I will fealessly and relentlessly improve our work at every opportunity. I will never allow it to degrade. (We need to constantly pay off tech debt and aim for a better codebase.)
+ I will do all that I can to keep the productivity of myself, and others, as high as possible. I will do nothing that decreases that productivity. (Find issues in your process that are slow and work to make them faster.)
+ I will continuously ensure that Iothers can cover for me, and that I can cover for them. (Work as a team, and take responsibility for finding people to cover for you.)
+ I will produce estimates that are honest both in magnitude and precision. I will not make proceses without certainty. (Try to make estimates that you are comfortable with, but have a reasonable range.)
+ I will never stop learning and improving my craft. (Programming changes all the time, so it’s our responsibility to stay on top of things.)

> So far, the number of programmers seems to double about every five years. Which means, _half of all programmers have less than five years experience._

### NLP: Something Old, Something New..., Eva Nahari

- n-grams, using vector maths to describe words
- Mikolow et al's CBOW vs Continuous Skip-gram - the latest and greatest in this space
- How do you know which words are related?
- How can you best predict which word should come next?
- How do you know what a given article (or bunch of text) is about?

### Cloud Native Java, Josh Long

Fantastic and engaging speaker! But I had to leave early :(

### Mob Programming: A Whole Team Approach, Woody Zull

- The whole team working on the same thing, at the same time, at the same computer. There might be other computers in the room for reference, but only one computer is used for the actual work.
- The “driver” role is there to translate what the avigators are saying into code.
- Anytime someone feels they’re not contributing or learning they should leave the group.
- Mob programming can only work if the team is allowed to do it - you need a company culture that’s open to it.
- It doesn’t have to be overwhelming, each person needs to be able “to contribute the right thing, at the right time, in the right way” but no one person needs to contribute all the time.

> I want to call out this animation because if I didn't you wouldn't notice and it took me FOUR hours to do.

### The Verification of a Distributed System, Catie McCaffrey

- Formal verification - a system that is provably correct
    + TLA+ and Coq are examples
    + The proofs cover every possible input and make sure the outputs are correct
    + Using propositional logic to define which inputs are allowed and how inputs are treated
    + Like testing, you can feel safe making updates because you can prove it won’t break things
    + It’s super slow... most projects won’t use it (but Amazon S3 did!)
- Distributed systems in the wild (see Simple Testing can Prevent Most Critical Falues paper)
    + Unit tests are actually really powerful, use them! 
    + Use code coverage tools to double check that error paths are covered. Devs typically write and test the happy path, but errors are where the big crashes often happen.
    + “Three nodes or less can reproduce 98% of failures”
- Property based testing - define properties and let the computer figure out if there are error cases
- Fault injection - intentionally break things to make sure the system works when that happens. (Example: Netflix’s Simian Army Chaos monkies)
    + Test your depencies!
    + Test in staging first - don’t make your users part of the testing

### Data Sciene as Software at Pintrest, Andrea Burbank

- To make good data based decisions, you need to have good data.
- Start with logging
    + Who’s doing what when?
    + Clean up the logs’ data with things like partitioned tables
- Opinionated data: the data doesn’t need 100% complete/accurate, it needs to be representative for the data you’re interested in. Example:
    + Find patterns to find badies - Spam often looks really similar, look for those patterns and discount them
    + It’s better than big data since you can be confident in your chosen opnionated data
- Use data to better understand software
    + Are there any anmolies in the data that can’t be explained? Maybe there’s something unexpected happening in the software.
- Treat your data as you would treat your software: the same good practices apply.

IMAGE HERE

> Think back to 2012, Pintrest was growing really fast. Mostly we were just trying to stop the system from falling over.

### Engineering you, Martin Thompson

- What should we learn?
    + Alorithms and data structures: knowledge that lasts well over time rather than specific frameworks or languages
    + Design fundamentals: separation of concerns, moving away from coupling
    + Programming paradigms: some are better for certain jobs than others, but you need to know how they all work before you can use them
    + Decomposition and abstraction: break things up and move logic away
    + Mathematics: have a better way to understand performance, this is becoming more imporant in a multi core world
    + Business Domains: understand the space you’re working in
    + Communications: protocols and interactions between systems and services
- Where can we learn?
    + Personal practice: be very intional about putting the above lessons into code
    + People and teams: your coworkers have a massive impact on how and how much you learn. “Don’t work with assholes.”
    + Research papers: there’s a lot of knowedge in research papers - go get it!
    + Read code: see good practices in other people’s code
    + Work projects: do the hard things first when you have the most time
    + Online: finding answers is easy, but knowing if an answer is good is harder
- How can we learn?
    + Find the time: automate repetitive tasks
    + Feedback cycles: how quickly can you get feedback about what and how you’re learning
    + Experimentation: be comfortable (and excited about) not knowing things
    + Revisit and refine: take a break before reviewing your own work
    + What can go wrong?: make sure you’re covering your error cases!

> We hear the new Tesla will have 300M lines of code. That’s terrifying! We”ve got to get better at this.

### Who are you, Really?, Dr. Brian Little

A deep dive into introversion vs. extroversion. This is a topic I’m particularly interested in, so I *loved* it! A lot of the information wasn’t new to me, so I didn’t take many notes. Here are some of my favourte quotes instead:


>Psycology is about finding ways we are like all others, some others, and no others.

> We may miscontstrue an introvert to be disagreable

> Extroverts get more traffic tickets. They need the stimulation.

Introverts tend to better in school, but have the same IQ as extroverts.

Abiverts tend to do well in sales: they use the extrovert’s skill for the pitch, and the introvert’s skill for asking follow up questions.

Caffeen *decreases* an introvert’s ability, but *increases* an extrovert’s.

### General notes

- Lots of emphasis on conway's law, and, more usefully, reverse conway's law - decide how you want your *code* structure look and then make your org look like that.
- JS has a Quick Check port for property based testing - check it out!
- We’re reinventing wheels:
    + TDD was thought of in 1967. 
    + There’s a discussion of agile development in 1968
    + Research into distributed systems happened in the 1980s
    + Perhaps we’re so busy disrupting we don’t take the time to look for lessons from the past.
- Discussion about being “professional” and living up to others’ expectations for what being a “programmer” means. Maybe we’re moving away from hackers and ninjas and towards well thought through programmers. Moved from CS is a theory based, research area to a massive explosion of cowbow programmers building everything to now when we’re putting more and more emphasis on quality and certainty.

* something