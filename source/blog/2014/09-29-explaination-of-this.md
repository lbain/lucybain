---
title: 'JS "this"'
tags: js, interview-questions
---

## Explain how this works in JavaScript

Huh, well that’s something I've been trying to figure out as I work with JS. `this` still doesn’t make perfect sense to me. But here’s my current understanding...

**`this` is the context the code is running in**

However, the context seems to change a lot, and I find it rather confusing. So I signed up for an [email series](http://derickbailey.com/email-courses/masteringthis/) on how `this` can change. Here’s a sweeping overview of that series:

* `this` refers to the window

At its simplest, `this` is the window itself without anything fancy going on. You can call `this` in the console directly and get Window.

* `this` refers to the object it’s being called from

```js
function currentYear() {
  return 2014;
}
var person = { birthYear: 1977,
               getAge: function() {
                 return currentYear() - this.birthYear;
               }
             };
person.getAge();
// returns 37
```

You can see the call to `this.birthYear` in the `getAge` function references the `person`’s `birthYear`. That is the `this` refers to its parent object. As a Ruby developer `this` is similar to `self`.

* `this` refers to the element the event is bound to

```js
$('a').on('click', function(event) {
  console.log(event.target === this); // logs true
});
```
Here the `this` refers to the link the user clicked on, just like `event.target`

* `this` refers to the context that was explicitly set

Apparently you can use `call` or `apply` and pass a context explicitly. In that case `this` refers to the passed context.

```js
function greeter(){
  return 'Hello ' + this.name + '!';
}

var passableContext = { name: 'world' };
greeter.call(passableContext)
// returns 'Hello world!'
```