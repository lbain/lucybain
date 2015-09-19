---
title: 'JS: explain Function.prototype.bind'
tags: js, interview-questions
---

## Explain Function.prototype.bind

I hadn’t heard of `bind` before, so I've just been reading up on this one. Woah. It’s pretty cool! Why hasn’t anyone mentioned it before?!

__Official answer__

`bind` allows you to set which object is treated as `this` within the function call.

Ok, I know that sounds a lot like [`call` or `apply`](/blog/2014/call-vs-apply/), but it’s not. It’s better!

__Longer answer__

You know how you sometimes write code like this:

```
function Person(name){
  this.name = name;
  this.distractedGreeting = function() {
    var self = this; // <-- this line!
    setTimeout(function(){
      console.log("Hello, my name is " + self.name); // <-- and here!
    }, 500);
  }
}

var alice = new Person('Alice');
alice.distractedGreeting();
// after 500ms logs "Hello, my name is Alice"
```

See that line `var self = this;`? That’s called “caching `this`”. (*Cache* as in save it away, not as in for optimisation purposes.)

That’s pretty handy, since it gives you access to the `Person` context within the `setTimeout` function. The “inside” `this` refers to the `setTimeout` context, which doesn’t have a `name` method.

But, it turns out, there is a better way! You can use `bind`. The example above is updated to:

```
function Person(name){
  this.name = name;
  this.distractedGreeting = function() {
    setTimeout(function(){
      console.log("Hello, my name is " + this.name);
    }.bind(this), 500); // <-- this line!
  }
}

var alice = new Person('Alice');
alice.distractedGreeting();
// after 500ms logs "Hello, my name is Alice"
```

Notice that `.bind(this)` at the end of the function definition? That means that the `this` within the `setTimeout` is bound to the same `this` within the `Person`. I think that’s pretty cool.

__Warning__

So for one shining second I thought I'd solved a lot of my JS headaches. I could just always bind `this` and all my context troubles would be so far away. Unfortunately that’s not the case. There are times that you want access to the “inner” context (`setTimeout` in our example). If you `.bind(this)` you'll lose access to the inner `this`.

How about an example to clear this up?

```
function Person(name){
  this.name = name;
  this.distractedGreeting = function() {
    setTimeout(function(){
      console.log("Hello, my name is " + this.name);
      console.log(this.location.origin); // error!
    }.bind(this), 500);
  }
}
```

Ok, so using `setTimeout` doesn’t lead to the most exciting example, but go with me here. We get an error on the `this.location.origin` because the newly bound `this` refers to the `Person` object, not the context of `setTimeout`. To get the outcome we're looking for, we have to cache `this`:


```
function Person(name){
  this.name = name;
  this.distractedGreeting = function() {
    var self = this; // caching
    setTimeout(function(){
      console.log("Hello, my name is " + self.name);
      console.log(this.location.origin);
    }, 500); // no binding
  }
}
```

Now when we call `distractedGreeting` we have access to both the `Person` context (`self`) and the `setTimeout` context (`this`).

__Resources__

* [Smashing Magazine](http://www.smashingmagazine.com/2014/01/23/understanding-javascript-function-prototype-bind/) (I found this one more readable)
* [Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
* [JS is sexy](http://javascriptissexy.com/javascript-apply-call-and-bind-methods-are-essential-for-javascript-professionals/?WPACFallback=1&WPACRandom=1417428763444) - super long and AMAZING post. It really goes into the details. I'm planning on reading it a second (and probably third) time.
