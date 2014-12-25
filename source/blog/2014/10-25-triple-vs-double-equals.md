---
title: 'JS: == vs. ==='
tags: js, interview-questions
---

## What is the difference between == and ===?

**Triple equals** checks for _type_ and equality.

**Double equals** only checks for equality.

*What? How can you check for equality without checking type?*

JS uses **type coercion** to check for equality without checking type. Here's an example:

```
1 == "1" // returns true

// what's really happening is:
1 === Number("1") // returns true
```

So when we do `1 == "1"` JS does type coercion to check for equality. That means it makes both sides of the same type (in this case `Number`). From there it checks for equality with type.

I had [problems](http://stackoverflow.com/questions/27523765/how-does-js-type-coercion-work) with another example, so we'll walk through that one too.

```
'0' == false //returns true
```
Here's how the logic goes (from [Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Using_the_Equality_Operators) via [stackoverflow](http://stackoverflow.com/a/7615326/863846)):

>If the two operands are not of the same type, JavaScript converts the operands then applies strict comparison. If either operand is a **number or a boolean**, the operands are converted to numbers if possible; else if either operand is a **string**, the other operand is converted to a string if possible. If both operands are **objects**, then JavaScript compares internal references which are equal when operands refer to the same object in memory.

Note: you can read the full spec [here](http://www.ecma-international.org/ecma-262/5.1/#sec-11.9.3), it's smaller than I expected.

So, in our example, one of the operands is a boolean. So then we convert both operands to numbers:

```
Number('0') == Number(false)
// goes to...
0 == 0
```

From here we can test for equalty with type since both operands are numbers.

**TL;DR**

Use `===`. Always.

**Resources**

* Massive amounts of documentation on [stackoverflow](http://stackoverflow.com/questions/7615214/in-javascript-why-is-0-equal-to-false-but-not-false-by-itself) (I love the community!)
* Very clear examples on [stackoverflow](http://stackoverflow.com/a/523650/863846)
* [Interactive display](http://f.cl.ly/items/3b0q1n0o1m142P1P340P/javascript_equality.html) of truthiness by [@tjmcewan](https://twitter.com/tjmcewan) (if that link is dead, you can check out the [code](https://github.com/dorey/JavaScript-Equality-Table))
* My [question](http://stackoverflow.com/questions/27523765/how-does-js-type-coercion-work)