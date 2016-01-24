---
title: "JS: ES6’s string templates"
tags: js, es6, string templates

description: Learn how to use ES6's new string templates and their security risks.
--- 

## How are the new string templates better?

The traditional JS way of working with strings leaves a lot to be desired. 

### variables

It’s not easy to read...

```
var someVar = "world";
console.log("Hello" + someVar + "!");
```

### newlines

It doesn’t handle new lines well...

```
console.log("Add a break\nhere");
console.log("Add a break" + 
"here");
console.log("Add a break\
here");
```

### standardisation with other languages

And it looks longingly at Ruby’s string interpolation...

```
someVar = "world"
puts "Hello #{someVar}"
```

## How can I use them?

*Ok, you sold me on that Ruby example... Tell me about ES6!*

ES6 introduced string templating to make working with strings easier and more elegant. Here are the same examples again:

### variables

Wrap up variables, or any other JS code in `${}`. The JS code will be evaluated first and then put into the rest of the string.

```
var someVar = "world";
console.log(`Hello ${someVar}!`); // "Hello world!"

console.log(`bonus example ${2 - 1}`) // "bonus example 1"
```

### newlines

You can add a real newline to your code when you want a newline in your string. Of course the `\n` still works.

```
console.log(`Add a break
    here`);
console.log(`Add a break\nhere`);
```

### standardisation with other languages

Now ES6’s strings work much like other languages.

Ruby:

```
someVar = "world"
puts "Hello #{someVar}"
```

JS:

```
var someVar = "world";
console.log(`Hello ${someVar}`);
```

**Note:** you can also use “tagged” template strings. I haven’t fully figured this out or found clear use cases for it, so I’m skipping it for now. But you can do more with templates than I’ve talked about.

## Warning!

The `${}` in ES6 evaluates *all* JS. It’s very important that you trust anything that goes in there. For example, don’t do something like:

```
// imagine this pulled from a DB and is user supplied
var user = {name: 'lucy'};
console.log(`Your name is: ${user.name}`)
```

*Why not?*

Because the JS in the string interpolation executes in the same context of the rest of your JS.

```
// here the user entered their name as: ' + alert('test') + '
var user = {name: '' + alert(window) + ''};
console.log(`Your name is: ${user.name}`)
```

This will trigger an alert. Don’t believe me? Enter the code above in [ES6 fiddle](http://www.es6fiddle.net/). If you’re not careful people can gain access to your “hidden” variables.

## Resources

* [Mozilla](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/template_strings)
* [Google Developers](https://developers.google.com/web/updates/2015/01/ES6-Template-Strings?hl=en)
* [Sitepoint](http://www.sitepoint.com/understanding-ecmascript-6-template-strings/)