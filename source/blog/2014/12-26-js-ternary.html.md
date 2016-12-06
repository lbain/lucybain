---
title: 'JS: ternary expressions'
tags: js, interview-questions
---

## Why is it called a Ternary expression, what does the word “Ternary” indicate?

Let’s answer the second question first: what does the word “ternary” indicate? According to [Wikipedia](http://en.wikipedia.org/wiki/Ternary_operation) the word “ternary” comes from the n-ary word setup. Other examples of n-ary words are u**nary** and bi**nary**. All of these (including ternary) are operands. The prefix section of their name lists how many inputs the operand accepts.

A **unary** operand accepts one parameter, e.g. `-1`, where `-` is the operand, and 1 is the parameter.

A **binary** operand accepts two parameters, e.g. `2 + 3`, where `+` is the operand, and `2` and `3` are the parameters.

So a **ternary** operand accepts three parameters.

In programming the ternary operand we use is a rewrite of an if statement. Before we write an actual ternary, we'll just take a quick look at an if statement:

```
if(conditional) { // one
    truethy_block // two
} else {
    falsey_block // three
}
```

You can see there are three sections to an if statement. Let’s write them as a property ternary expression:

```
conditional ? truethy_block : falsey_block
```

All the same code is there, but it’s arranged slightly differently. The ternary’s operand looks like `?:`.

In JS ternarys are often used for assignment:

```
is_sunny = true;
var weather = is_sunny ? ’sunny' : 'Cloudy';
console.log(weather); // logs ’sunny'
```

They can also be used for very short conditional statements. But be wary of using them for long or complex logic as they are harder to read than traditional statements.

**Resources**

* [`?:`](http://en.wikipedia.org/wiki/%3F:) on Wikipedia
* [unary operands](http://en.wikipedia.org/wiki/Unary_operation) on Wikipedia
* [binary operands](http://en.wikipedia.org/wiki/Binary_operation) on Wikipedia
* [Stackoverflow](http://stackoverflow.com/questions/6259982/js-how-to-use-the-ternary-operator) about using the JS ternary operand specifically

