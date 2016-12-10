---
title: 'JS: attribute vs. property'
tags: js, interview-questions

featured: true
---

## What’s the difference between an “attribute” and a “property”?

As usual, let’s start smaller.

**What is a property?**

JS DOM objects have properties. These properties are kind of like instance variables for the particular element. As such, a property can be different types (boolean, string, etc.). Properties can be accessed using jQuery’s `prop` method (as seen below) and also by interacting with the object in vanilla JS.

Let’s take a look:

```
<a href='page2.html' class='link classes' name='linkName' id='linkID'>Hi</a>

$('#linkID').prop('href'); // returns "http://example.com/page2.html"
$('#linkID').prop('name'); // returns "linkName"
$('#linkID').prop('id'); // returns "linkID"
$('#linkID').prop('className'); // returns "link classes"
```

As you can see, all of the properties we set in the HTML are available through `prop`. Other properties are available too, such as `style`, even though we didn’t explicitly set them.

Properties can also be updated through the `prop` method:

```
<a href='page2.html'>Hi</a>

$('#linkID').prop('href', 'page1.html');
$('#linkID').prop('href'); // returns "http://example.com/page1.html"
```

**What is an attribute?**

Attributes are in the HTML itself, rather than in the DOM. They are very similar to properties, but not quite as good. When a property is available it’s recommended that you work with properties rather than attributes.

An attribute is only ever a string, no other type.

```
<input type="checkbox" checked=true/>

$('input').prop('checked'); // returns true
$('input').attr('checked'); // returns "checked"
```

If an element has a default value, the attribute shows the default value even if the value has changed.

```
<input type="text" name="username" value="user123">

$('input').prop('value', '456user');
$('input').prop('value'); // returns "456user"
$('input').attr('value'); // returns "user123"
```

Attributes can be useful when you want to set a custom attribute, that is, when there is no property associated.

```
<input type="text">

$('input').attr('customAttribute', 'something custom');
$('input').attr('customAttribute'); // returns "something custom"
$('input').prop('customAttribute'); // returns undefined
```

But, to be fair, you can also use custom properties (although this might be bad practice).

```
<input type="text">

$('input').prop('customAttribute', 'something custom');
$('input').prop('customAttribute'); // returns "something custom"
$('input').attr('customAttribute'); // returns undefined
```

**References**

* [Stack overflow](http://stackoverflow.com/a/5884994/863846)
* [jQuery Howto](http://jquery-howto.blogspot.com.au/2011/06/html-difference-between-attribute-and.html)


