---
title: 'Retro from my coding test'
tags: js, interview-questions
---

I've been looking for a new job over the past month. As part of my interview process I had to do an at home coding exercise. The directions were simple, but disconcertingly vague:

* The application should run successfully in modern browsers.
Your app should retrieve a data set from a persistence layer or data service of your choice.
* The data set should contain a minimum of 4 columns and 5 rows.
* Create a README file with instructions, a brief description of your app with reasons for your approach and technology as well as any future enhancements you would make given more time
* Bundle your app in a zip file and email to [the company]
* Allow up to 3 hours for this task. Please be honest with your allocation of time.

Ok, so three hours is way too long for a simple AJAX call and display of four columns and five rows. So I figured they wanted something a little more interesting than a table of data. I also didn't want to waste any of my precious three hours working on a back-end - I applied for a front-end role and that's what I wanted to work on. I decided to work with data from Facebook.

**Tip:** It turns out there's a TON of very interesting [data avaialble](https://www.reddit.com/r/datasets). If you have to do anything like this in the future look into these rather than using FB!

I wanted to work with something real that users might care about. I also wanted to get more experience with working with Facebook since it's often used on sites. These were great reasons to choose Facebook, but, as it turns out, probably not a good decision for a coding test. Working with FB requires OAuth and a bunch of setup.

**Tip:** Don't try to work with anything particularly complex for your coding test. It's better that you do a simple thing well than that you don't finish a complex thing.

Thankfully I used a library called [hello.js](http://adodson.com/hello.js/) that took care of most of the setup. However I had never worked with hello.js before and getting up to speed with it took time - which I was rapidly running out of. I ended up wasting an hour trying to debug [something](http://stackoverflow.com/questions/27729186/how-can-i-get-share-data-with-hello-js) which I never really got an answer to - I ended up going a different direction and resetting the clock for that hour.

**Tip:** Don't work with new technologies / libraries / languages for your coding test. Focus on what you're already good at and do that thing well.

I got all my interaction working as expected and then got moving on the styling. I grabbed a generated colour pallet from [coolors.co](http://coolors.co/) and set up some base styles. It wasn't anything fancy, it was kinda mobile friendly, but only in the roughest sense, and things looked sorta ok. But it worked, and it no longer looked like simple HTML. This was a success, I'm pleased with the amount of time I spent on styling.

**Tip:** Styling matters. It's the first thing your users (read graders) will see. Don't just gloss over it because it's not your main love. That said, your users will know that you only had a set amount of time to work on something. This does not need to be pixel perfect. Make it nice, but don't waste your time.

Finally it was time to run some full tests. I grabbed my partner and asked him to try logging in with my app so I could get his user details (photos). No dice. Errors. Panic.

**Tip:** When you're developing your code test, try to test it in the same environment the user will have as early as possible. Identify possible rough patches and take note. Even if you can't fix them you can at least know you'll need to include something about them in the readme.

As I found out in my increasingly stressed out state - FB requires you to officially publish your app before you're allowed to get the public to use it (fair enough, but I had hours before my test was due). I also learned that the process would take around seven days, but that it's possible my app could be rejected and take longer. I was full on freaking out.

**Tip:** Much like in school, you should start your coding test as soon as you get your assignment.

I finally worked out that if I made my partner a developer for the app he would have access to it, and thus be able to see all the hard work I'd done. I calmed down a bit and made sure everything was working as it should from then it. (It was; that was the bit I was able to easily test using my own account.)

That was the end of my three hours.

**Tip:** Make sure you write down the start and end times of any work sections you do. I thought I'd remember, and I'm pretty sure I was fairly accurate, but I'm sure I wasn't perfect. Guesstimating exactly how many minutes you've spent on a coding test is stress you don't need.

I moved on to the readme. I was actually pretty pleased how this turned out. In their directions they included what they expected from a readme ("a brief description of your app with reasons for your approach and technology as well as any future enhancements you would make given more time"), which was my guide. I also included a section about how to use my app, since they had to request permission to be a developer in order to get it working.

**Tip:** Try to make it as easy as possible for your reviewers to grade your code. Keep the install process as short, and your explanation of the install process as clear, as possible.

I spent the most time on the "future enhancements" which included a lot about refactoring. I wasn't able to do everything I wanted to have beautiful code given the time constraints. I wanted them to know that I knew things weren't perfect. This was a good tactic - the couple of things they asked me about in my next interview were a the things I hadn't mentioned in my readme.

**Tip:** The more questions you can answer in your readme (in the comfort of your own home), the fewer you have to answer in the interview (with someone staring at you).

And that was it! It was pretty stressful, so I hope the next time I need to do a coding test I'll have learned a little and can stay a bit more calm!