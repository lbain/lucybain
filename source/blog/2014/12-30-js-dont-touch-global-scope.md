---
title: "JS: don’t touch the global scope"
tags: js, interview-questions
---

One of the last installments from my series on [javascript interview questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions#js).

## Why is it, in general, a good idea to leave the global scope of a website as-is and never touch it?

Form most languages, global variables are [considered](http://en.wikipedia.org/wiki/Global_variable#Use) a “bad thing”. JS is no different, but it probably has more severe consequences than most languages.

Some points on why **global variables are generally bad** (taken from [Cunningham & Cunningham](http://c2.com/cgi/wiki?GlobalVariablesAreBad) with modifications for easier reading):

* It’s harder to read the code and reason about it when variables seem to appear out of thin air (but really from the global scope).
* Anyone can update a global variable from any point in the program at any time (and from any thread if there’s more than one going).
* General [code smell](http://en.wikipedia.org/wiki/Code_smell) - if you're too lazy to put the variable only where it needs to be then what other corners are you cutting?
* It’s probable that you'll encounter global variable name clashes. Since there’s only one namespace you're more likely to double up on a variable name.

**Global variables are particularly bad for JS.**

Not only are all of those points above true (and a few others I didn’t include), but for JS specifically global variables can be particularly problematic. This is because JS defaults all variables to the global scope unless they are explicitly defined elsewhere. Here’s an example:

```
function badlyScoped() {
    globalVariable = "I'm a global variable";
}

badlyScoped();
console.log(globalVariable); // logs "I'm a global variable"
```

Well isn’t that terrifying! We thought we were creating a local variable, since it was defined within a function, but nope! We forgot the `var` keyword, which would make the variable local. Here’s a corrected version:

```
function wellScoped() {
    var localVariable = "I'm a local variable";
}

wellScoped();
console.log(localVariable); // throws: "localVariable is not defined"
```

This is a quirk ([some say](http://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742) a mistake) of JS. It makes global variables particularly dangerous since you might not even know you were creating one. So watch your back and don’t forget to use `var`!

**Resources:**

* a more in depth discussion about [why globals are bad](http://c2.com/cgi/wiki?GlobalVariablesAreBad)
* some ways to [avoid global variables](http://stackoverflow.com/questions/1841916/how-to-avoid-global-variables-in-javascript)
* [stackoverflow](http://stackoverflow.com/questions/2613310/ive-heard-global-variables-are-bad-what-alternative-solution-should-i-use) question about why globals are bad




