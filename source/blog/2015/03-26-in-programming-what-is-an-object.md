---
title: "In programming, what is an object?"
tags: programming-basics
---

As promissed in my last blog post: intro to objects.

## Objects

Many languages have the concept of an "object." It’s a way of organising code based around objects (things) with similar characteristics. As in, most dogs have four legs, most cars can drive forward, most houses have doors. Templates (often called Classes) are used to create objects. These templates come with empty fields (like a form), and sometimes with default values as well (such as four legs). So it could look something like this:

**Human**

````
Name: ________
Gender: ________
Arms: _2_
Legs: _2_
````

As you can see some fields (name and gender) are left blank, and some (arms and legs) have a default value associated. Again, this is a template, these values are assigned for each object (often called "instance of the class"). Mine would look like this:

````
Name: _Lucy_
Gender: _Female_
Arms: _2_
Legs: _2_
````

But objects hold more than just fields of information; they can also hold actions! Let’s build on our Human class.

**Human**

````
Name: ________
Gender: ________
Arms: _2_
Legs: _2_
Laugh: say "hahaha!"
Run: move your legs quickly
````

So you can see the Human template now has two actions associated with it (laugh and run). Here’s the great part about objects: those actions are shared! I only have to write the method *once* and all humans can now laugh and run. Pretty slick, huh?

So a **class** is a template of fields (variables) and actions (methods). Each **object** fills out the template with it’s particular information. This is how you can write code like `me.name` - the `me` object has a `name` field that keeps track of `me`’s name. It’s also how you can write:

```
fido.bark();
buddy.bark();
buster.bark();
princess.bark();
```

but only need to implement the `bark` action on the `Dog` template.

**Object Oriented Programming** is a way of organising your code into these objects for ease of use, readability, and understanding. It’s not the only [programming paradigm](http://upload.wikimedia.org/wikipedia/commons/f/f7/Programming_paradigms.svg), but it’s been popular over the years.

**Resources**

* [Reddit](http://www.reddit.com/r/explainlikeimfive/comments/lii0o/eli5_what_do_it_programmer_developer_people_mean/)
* More [Reddit](http://www.reddit.com/r/explainlikeimfive/comments/j4dmq/eli5_what_is_objectoriented_programming/)
* Still more [Reddit](http://www.reddit.com/r/explainlikeimfive/comments/syjy3/can_someone_explain_object_oriented_programming/)