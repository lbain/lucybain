---
title: YOW! Day One
tags: conference

description: Notes from the YOW! 2016 conference, including topics such as mob programming, distributed systems, data science at Pinterest, how to be a better developer.
keywords: conference, yow, australia, tech conference
---

In Australia we have a well known conference called YOW!. Yes, the name is in all capitals and contains an exclamation point; no it's not ten times more exciting than any other tech conference. I’d always assumed this conference had more of a Java and enterprise focus, so I hadn’t gone before. But I’m curious about conferences, and they were looking for volunteers so I signed up.

First of all, you’ll notice it’s a really well run conference. They run it for profit, and people have Real Jobs working for YOW! and the quality comes through. I enjoyed [Ela Conf](/blog/2016/ela-conf-day-1/), but it certainly had a home grown, community feel to it in comparison.

So let’s dive into the talks!

### The Scribe's Oath, [Robert Martin](https://twitter.com/unclebobmartin) (Uncle Bob)

Programmers are the scribes of the modern world. Just like the scribes in ancient times, we have special knowledge about how the world works and how to change it. Having this much power means we will, at some point, become a regulated profession (like doctors and lawyers). Let’s jump the gun and regulate ourselves before government gets involved.

Suggested programmer’s oath:

1. I will not produce harmful code. (Both in how it works and what it does. We shouldn’t do things like catching errors without handling them.)
1. The code that I produce will always be my best work. I will not knowingly allow code that is defective either in behaviour or structure to accumulate. (Employers and the world expect we’re doing our best work all the time. Although it’s expected that what we write will “rot” a.k.a. become tech debt, it’s also expected that we will correct these problems.)
1. I will produce, with each release, a quick, sure, and repeatable proof that every element of the code works as it should. (A full coverage test suite.)
1. I will make frequent, small, releases so that I do not impede the process of others. (Your work shouldn’t negatively impact the work of others. You shouldn’t have long running branches that mess up other people.)
1. I will fearlessly and relentlessly improve our work at every opportunity. I will never allow it to degrade. (We need to constantly pay off tech debt and aim for a better codebase.)
1. I will do all that I can to keep the productivity of myself, and others, as high as possible. I will do nothing that decreases that productivity. (Find issues in your process that are slow and work to make them faster.)
1. I will continuously ensure that others can cover for me, and that I can cover for them. (Work as a team, especially when it comes to time away from the team.)
1. I will produce estimates that are honest both in magnitude and precision. I will not make process without certainty. (Try to make estimates that you are comfortable with, but have a reasonable range.)
1. I will never stop learning and improving my craft. (Programming changes all the time, so it’s our responsibility to stay on top of things.)

Interesting quote:

> So far, the number of programmers seems to double about every five years. Which means, _half of all programmers have less than five years experience._

### Mob Programming: A Whole Team Approach, [Woody Zuill](https://twitter.com/WoodyZuill)

- The whole team working on the same thing, at the same time, at the same computer. There might be other computers in the room for reference, but only one computer is used for the actual work.
- The “driver” role is there to translate what the navigators say into code. They should not be coming up with the ideas themselves. “An idea should never originate and be typed by the same person.”
- Any time someone feels they’re not contributing or learning they should leave the group.
- Mob programming can only work if the team is allowed to do it - you need a company culture that’s open to the idea of programmers working together so much (often appearing unproductive to the untrained eye).
- Each person is there “to contribute the right thing, at the right time, in the right way” but no one person needs to contribute all the time.

Adorable quote:

> I want to call out this animation because if I didn't you wouldn't notice and it took me *four hours* to do.

### The Verification of a Distributed System, [Caitie McCaffrey](https://twitter.com/caitie)

- Formal verification: a way of formally proving a system is correct
    + The proofs cover every possible input and make sure the outputs are correct
    + Use propositional logic to define which inputs are allowed and how inputs are treated
    + Like testing, you can feel safe making updates because you can prove it won’t break things
    + It’s super slow... most projects won’t use it (but Amazon S3 did, and found a critical bug!)
- Distributed systems in the wild (see [Simple Testing can Prevent Most Critical Failures](https://www.usenix.org/system/files/conference/osdi14/osdi14-paper-yuan.pdf) paper)
    + Unit tests are actually really powerful, use them! 
    + Use code coverage tools to double check that error paths are covered. Developers typically write and test the happy path, but errors are where the big crashes often happen.
    + “Three nodes or less can reproduce 98% of failures” — same Simple Testing paper
- Property based testing: define properties and let the computer figure out if there are error cases
    + JS has a [library](http://jsverify.github.io/) for property based testing, inspired by QuickCheck port for property based testing
- Fault injection: intentionally break things to make sure the system works when that happens. (Example: Netflix’s Chaos Monkey)
    + Test your dependencies!
    + Test in staging first, don’t make your users part of the testing

![Test more in areas that are more likely to have errors](/images/blog/yow-2016/distributed-system-verification.jpg)

### Data Science as Software at Pinterest, [Andrea Burbank](https://twitter.com/arburbank)

- To make good data based decisions, you need to have good data.
- Start with logging
    + Who’s doing what when?
    + Clean up the logs’ data as much as possible (probably using things like partitioned tables)
- Opinionated data: the data doesn’t need 100% complete or accurate, it needs to be representative for the data you’re interested in.
    + Having less *opinionated* data is better than having more *unopinionated* data since you can be confident in what’s counted and discounted in opinionated data.
    + Example: Find patterns to find badies. Since spam often looks really similar, you can look for patterns in usage and mark users’ data as spam. You don’t need to delete these users or the data, you just need to discount the data from your metrics.
- Use data to better understand software
    + Are there any anomalies in the data that can’t be explained? Maybe there’s something unexpected happening in the software.
- Treat your data as you would treat your software; the same good practices apply.

![Data should be treated like code](/images/blog/yow-2016/data-as-code.jpg)

Realistic quote:

> Think back to 2012, Pinterest was growing really fast. Mostly we were just trying to stop the system from falling over.

### Engineering you, [Martin Thompson](http://mechanical-sympathy.blogspot.com.au/)

- What should we learn?
    + Focus on topics that last well over time, rather than specific frameworks or languages.
    + Learn about when to use one method over another; Only dive into the details when it’s time to implement.
    + Suggestions: algorithms and data structures, design fundamentals, programming paradigms, decomposition and abstraction, Mathematics, business domains, communications
- How can we learn?
    + Practical practice: be intentional about putting everything you learn into code.
    + Your co-workers have a massive impact on how and how much you learn. Pick teams with a good learning culture.
    + When it comes to work projects, do the hard things first when you have the most time, don’t leave them to the end when you’ll have to rush through.
- How can we learn?
    + First of all, give yourself more time by automating tasks where possible.
    + Focus on having a better learning experience. How quickly can you get feedback about what and how you’re learning?

Down to earth quote:

> Don’t work with assholes.

### Who are you, Really?, [Dr. Brian Little](https://twitter.com/drbrianrlittle)

A deep dive into introversion vs. extroversion. This is a topic I’m particularly interested in, so I *loved* it! Dr. Little was an incredibly engaging speaker, so I forgot to take many notes. I did jot down a few quotes or points of interest:

- Caffeine *decreases* an introvert’s ability, but *increases* an extrovert’s.
- Introverts tend to better in school, but have the same IQ as extroverts.
- Ambiverts tend to do well in sales: they use the extrovert’s skill for the pitch, and the introvert’s skill for asking follow up questions.

> Extroverts get more traffic tickets. They need the stimulation.

<!-- -->
> Psychology is about finding ways we are like all others, some others, and no others.

- - -

That’s a wrap on day one! It’s been pretty full on, and I’m looking forward to tomorrow!