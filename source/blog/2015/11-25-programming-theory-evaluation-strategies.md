---
title: "Programming theory: Evaluation strategies"
tags: programming, intro-programming, theory

description: A look at various ways to pass variables to functions. Specifically by reference, value, and by sharing.
keywords: pass by reference, pass by value, pass by sharing, vs.
---

This is a topic I learned at university, but didn’t fully understand all the repercussions of until later. This post is to help you understand the differences and to help me remember them :)

Let’s get started!

*But wait, what’s an “evaluation strategy”? I’ve never heard of that before!*

To be honest, I hadn’t either until I did some research for this post. The title for this group of concepts isn’t widely used, so knowing “evaluation strategy” probably won’t be super useful. However, the question all evaluation strategies are trying to answer is “how do parameters work in this particular language?” And it is *very* useful to know the answer to that question for your language.

For example, this non-language below (which is purposefully a mismatch of ruby, python, and JS so it doesn’t look real):

```
a = 1

function passBySomething(param):
    param = 2
end

passBySomething(a)
log(a) // what happens here?
```

There are a few options that could happen, which is what today’s post is all about.

Since I love metaphors and because we haven’t talked about how computer memory works yet (although it might show up soon!) we won’t cover “under the hood” details. Instead we will work with a story:

> As you look around your apartment you decide you would like some new artwork to spruce the place up a bit. As it so happens you have a nice piece of canvas at home, all ready to go. You also have a friend, Fred, who is an artist and who’s agreed to make you something (that you’ll pay for, of course!).

With that in mind we’re ready to go! 

**Disclaimer:** Because we’re not going into the details, nor are we looking at a particular language, these explanations might not apply 100% to your language. Please look up additional examples for your language.

## Pass by reference

> You give your canvas to Fred and **he paints it for you** (thanks Fred!). Then he gives you the painted canvas back.

This is probably the easiest one to get our heads around, since it’s pretty much what happens in real life.

Here’s what pass by reference would be in our pretend language:

```
canvas = [] // (this is a blank canvas)

function artistFred(item):
    paint(item) // notice the lack of return keyword
end

log(canvas) // [] (blank canvas)
artistFred(canvas)
log(canvas) // [*&] (painted canvas)
```

Seems straight forward enough, but what if Fred decides to do something different?

> You give your canvas to Fred and **he makes a sculpture instead**. Then he gives you the sculpture back.

Again, this translates to the following “code”:

```
canvas = [] // (blank canvas)

function artistFred(item):
    item = new Sculpture()
end

log(canvas) // [] (blank canvas)
artistFred(canvas)
log(canvas) // V (new sculpture)
```

Now you don’t have your original canvas (Fred replaced it entirely), you only have the sculpture Fred gave you.

Pass by reference is incredibly trusting. You like Fred, and he’s a really good artist. If he says a sculpture would be better for your space you’re cool to go with that. If he paints the whole canvas one colour and tells you it’s art, you’ll believe him and put it up with pride. After all, Fred’s a good guy and you trust him.

### More formal definition

In pass by reference the original variable (declared outside the function’s scope) can be changed in any way by the function. It can be altered or reassigned in the function and the new value will persist after the function has returned.

## Pass by value

> You go to the store and buy a new piece of canvas that is exactly the same as the one you already own. You give the new canvas to Fred and **he paints it for you** (thanks Fred!). Then he gives you the painted canvas back, and you can choose to replace your blank canvas with the painted one, keep both, or just look at Fred’s work and decide not to keep it.

In our pretend coding language it would look something like this:

```
canvas = [] // (blank canvas)

function artistFred(item):
    return paint(item) // notice the new return keyword
end

log(canvas) // [] (blank canvas)
artistFred(canvas) // look at the Fred’s work but decide not to keep it
log(canvas) // [] (blank canvas)

newCanvas = artistFred(canvas) // keep both
log(canvas) // [] (blank canvas)
log(newCanvas) // [*&] (painted canvas)

canvas = artistFred(canvas) // replace blank canvas with the painted one
log(canvas) // [*&] (painted canvas)
```

Of course, Fred might decide to do something else entirely. Let’s look at another possibility:

> You go to the store and buy a new piece of canvas that is exactly the same as the one you already own. You give the new canvas to Fred, but he throws away the new canvas and **decides to make a sculpture instead.** Then he gives you the sculpture back, and you can choose to replace your blank canvas with the sculpture, keep both, or just look at Fred’s work and decide not to keep it.

Again, in our fake language would be:

```
canvas = [] // (blank canvas)

function artistFred(item):
    item = new Sculpture()
    return item
end

log(canvas) // [] (blank canvas)
artistFred(canvas) // look at the Fred’s work but decide not to keep it
log(canvas) // [] (blank canvas)

newSculpture = artistFred(canvas) // keep both
log(canvas) // [] (blank canvas)
log(newSculpture) // V (sculpture)

canvas = artistFred(canvas) // replace blank canvas with the sculpture
log(canvas) // V (sculpture)
```

I think of pass by value as slightly paranoid. Because really, you don’t trust Fred very much. You think he might make an ugly painting and you want to keep your piece of canvas safe in case that happens. Or you know he doesn’t follow directions well and you didn’t want that sculpture anyway...

### More formal definition

In pass by value the original variable (declared outside the function’s scope) is not altered in any way by the function. It must be explicitly overwritten by reassigning it with the results of the function call.


## Pass by sharing

This is a bit of a mix between pass by reference and pass by value.

> You give your (only) canvas to Fred and **he paints it for you** (thanks Fred!). Then he gives you the painted canvas back.
 
So far this is exactly the same as pass by reference.

```
canvas = [] // (blank canvas)

function artistFred(item):
    paint(item)
end

log(canvas) // [] (blank canvas)
artistFred(canvas)
log(canvas) // [*&] (painted canvas)
```

But again, Fred might decide to do something different:

> You give your (only) canvas to Fred. He sets the untouched canvas aside and **makes a sculpture instead**. Then he gives you the sculpture back, and you can choose to replace your blank canvas with the sculpture, keep both, or just look at Fred’s work and decide not to keep it.

```
canvas = [] // (blank canvas)

function artistFred(item):
    item = new Sculpture()
    return item
end

log(canvas) // [] (blank canvas)
artistFred(canvas) // look at the Fred’s work but decide not to keep it
log(canvas) // [] (blank canvas)

newSculpture = artistFred(canvas) // keep both
log(canvas) // [] (blank canvas)
log(newSculpture) // V (sculpture)

canvas = artistFred(canvas) // replace blank canvas with the painted one
log(canvas) // V (sculpture)
```

This version is exactly the same as pass by value.

This is probably the most reasonable level of trust. You asked for a painting and a sculpture just won’t do. You trust Fred enough to paint a blank canvas, but you want your canvas to be usable if he decided to go off an make a sculpture instead. After all, you asked for a painting, not a sculpture.

*What gives? How can you mix and match like that?*

It all depends on if the canvas is altered or replaced. If Fred simply alters the canvas by painting it, then the original (blank) canvas is changed forever. However, if Fred wants to replace the canvas, he can’t throw it away, but must create a sculpture as an entirely new thing.

### More fomal definition

In pass by sharing the original variable (declared outside the function’s scope) can only be altered in so far as it is mutable. It cannot be reassigned inside the function call. Any changes to a mutable type will persist after the function returns. Any attempts to reassign a variable will not persist.

## And one more thing...

People use the wrong name all. the. time. Officially most languages use pass by sharing. Per [Wikipedia](https://en.wikipedia.org/wiki/Evaluation_strategy#Call_by_sharing):

> It is used by languages such as Python, Iota, Java (for object references), Ruby, JavaScript, Scheme, OCaml, AppleScript, and many others.

However, most people don’t say a particular language is “pass by sharing.” Unfortuantely “pass by reference” and “pass by value” are much more famous phrases than “pass by sharing” (probably because it’s what we’re taught at universities), and so people often use one of those terms even when it’s incorrect.

This semantic mixing caused me a fair amount of confusion because JS shows some pass by reference qualities:

```
var obj = {a: 1};

function referenceTest(input) {
    input.a = 2;
}

console.log(obj); // logs {a: 1}
referenceTest(obj);
console.log(obj); // logs {a: 2}
```

and some pass by value qualities:

```
var num = 1;

function valueTest(input) {
    input = 1;
}

console.log(num); // logs 1
valueTest(num);
console.log(num); // logs 1
```

It took me a long time to realise that JS was pass by reference *sometimes* and pass by value *other times*. And I only learned today that this mix of of the two, which many common languages use, is called pass by sharing.



## Resources

* [Wikipedia](https://en.wikipedia.org/wiki/Evaluation_strategy)
* [Stackoverflow](http://stackoverflow.com/questions/518000/is-javascript-a-pass-by-reference-or-pass-by-value-language)
* Examples and explanation for [Python](https://www.jeffknupp.com/blog/2012/11/13/is-python-callbyvalue-or-callbyreference-neither/)







