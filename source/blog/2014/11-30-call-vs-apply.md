---
title: 'JS: .call vs. .apply'
tags: js, interview-questions
---

## What's the difference between `.call` and `.apply`?

Let's start with the similarities.

__What are `.call` and `.apply`?__

Both methods allow you to invoke a function and pass parameters through.

```
function printer(message) {
    console.log(message)
}

printer.call({}, "hello") // logs "hello"
printer.apply({}, "world!") // logs "world!"
```

*Wow. Awesome. A more verbose way to invoke functions. Fantastic. Why not just use `printer("hello")`?*

Well actually, `.call` and `.apply` can do more than simply invoke a method, they can also pass through __context__. Here's an example:

```
function Person(name){
    this.name = name;
    this.introduceSelf = function() {
        console.log("Hello, my name is " + this.name);
    }
}

var alice = new Person('Alice');
alice.introduceSelf();
// logs "Hello, my name is Alice", as expected

alice.introduceSelf.call({name: "Bob"});
// logs "Hello, my name is Bob"

alice.introduceSelf.apply({name: "Casey"});
// logs "Hello, my name is Casey"
```

So `.call` and `.apply` allow you to manipulate the `this` keyword for the invoked function.

On to the main question...

__What's the difference between `.call` and `.apply`?__

It's all about the way you pass parameters. That's it. Let's make our previous example more complex:

```
function Person(name){
    this.name = name;
    this.introduceSelf = function(greeting) {
        console.log(greeting + ", my name is " + this.name);
    }
}

var alice = new Person('Alice');
alice.introduceSelf('Hello');
// logs "Hello, my name is Alice", as expected

alice.introduceSelf.call({name: "Bob"}, 'Bonjour');
// logs "Bonjour, my name is Bob"

alice.introduceSelf.apply({name: "Casey"}, ['Hola']);
// logs "Hola, my name is Casey"
```

For `.call` you pass the parameters comma separated (like normal). For `.apply` you pass the parameters in an array.

*Why would you even bother having these two ways? Why not standardise?*

That's a fair question. But the two methods have different use cases. If you know exactly how many arguments you're passing, you should use `.call`. If you don't know, or if your arguments are already in an array, you should use `.apply`. (Rephrased from a helpful [stackoverflow answer](http://stackoverflow.com/a/1987244/863846).)

*Ok, how am I going to remember this?*

Turns out the folks on stackoverflow have some thoughts on that one too. Here's how I'll be remembering it:

> __a__pply uses __a__n __a__rray
>
> __c__all __c__ounts with __c__ommas

__Resources__

* [stackoverflow question](http://stackoverflow.com/questions/1986896/what-is-the-difference-between-call-and-apply)
* [Scott Allen's post](http://odetocode.com/blogs/scott/archive/2007/07/04/function-apply-and-function-call-in-javascript.aspx)
