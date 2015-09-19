---
title: 'JS: Describe event bubbling'
tags: js, interview-questions
---

## Describe event bubbling

Event bubbling occurs when a user interacts with a nested element and the event propagates up (“bubbles”) through all of the ancestor elements.

**HTML**

```
<div class="ancestor">
  <div class="parent">
    <button> Click me! </button>
  </div>
</div>
```

When a user clicks the button the event first fires on the button itself, then bubbles up to the parent div, and then up to the ancestor div. The event would continue to bubble up through all the ancestors, until it finally reaches the `document`.

**Javascript**

```
$( "button" ).click(function(event) {
  console.log( "button was clicked!" );
});

$( ".parent" ).click(function(event) {
  console.log( "child element was clicked!" );
});

$( ".ancestor" ).click(function(event) {
  console.log( "descendant element was clicked!" );
});
```

When the user clicks the button the events starts at the button element, so `button was clicked!` is logged to the console. Then `child element was clicked!` and finally `descendant element was clicked!` are logged as well.

**Stopping event bubbling**

*What if you don't want the event to bubble up?*

A fair question. Often you only want the event to trigger on the element itself, without bothering all its ancestors. Consider the following JS (with the same HTML as above):

```
$( "button" ).click(function(event) {
  console.log( "button was clicked!" );
});

$( ".parent, .ancestor" ).click(function(event) {
  console.log( "don't click me!" );
});
```

As it stands, the `don't click me!` will get logged when the user clicks on the button, even though they haven't actually clicked on the parent or ancestor element.

You have to explicitly stop event propagation (bubbling) if you don't want it.

```
$( "button" ).click(function(event) {
  event.stopPropagation(); // <-- this line here!
  console.log( "button was clicked!" );
});

$( ".parent, .ancestor" ).click(function(event) {
  console.log( "don't click me!" );
});
```

Now the event propagation stops on the first element of the bubbling sequence. You can also stop the bubbling later on if you'd like, it doesn't have to be on the first element.

**Related**

The reverse of events that bubble up are events that trickle down. Originally some browsers thought events should trickle down from the ancestors to the element that was interacted with. Now all browsers implenet bubble up events, and some support trickle down.

**References**

* [Quirks Mode](http://www.quirksmode.org/js/events_order.html)