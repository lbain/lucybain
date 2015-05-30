---
title: "JS: How can you accept optional parameters?"
tags: js, interview-questions
---

There's more than one way to skin a cat, and there's more than one way to accept optional parameters. (Editors note: I do not condone skinning cats!)

## Object

Coming from a Ruby background, I find this option the most intuitive. You can create an object of your optional parameters, it'd look something like this:

```
var params = {
    size: 'small',
    color: 'red'
};

function carSentence(optionalParams) {
    var size = optionalParams.size;
    var color = optionalParams.color;
    var speed = optionalParams.speed;
    console.log("My favourite car is a " + size +
                " sized " + color + " one that goes " + speed);
}
carSentence(params);
// logs "My favourite car is a small sized red one that goes "
```

As you can see I didn't supply the `speed` parameter in my `params` object, but the `carSentence` function still worked. So `speed` was an optional parameter.

**But `optionalParams` was still required**

Yep, you caught me! This isn't really what people usually mean by "optional" parameters. But I did want to throw it out there as a possibility. I think it's an underrated option.

**What if I wanted a default speed?**

`optionalParams` didn't define a value for `speed`, but the sentence expected `speed` to be defined. In this case you can give a default value for the variable (such as `"fast"`). It's tempting to do this:

```
var speed = optionalParams.speed || "fast";
```

but this won't work when `optionalParams.speed` is `false`. The better way to handle it is:

```
var speed;
if (typeof optionalParams.speed !== 'undefined') {
    speed = optionalParams.speed;
} else {
    speed = "fast";
}
```

however that's quite wordy. You can cut it down with a [ternary](/blog/2014/js-ternary/), or make a `givenOrDefault` method (hopefully with a better name!).

```
function givenOrDefault(given, default) {
    if (typeof given !== 'undefined') {
        return given;
    } else {
        return default;
    }
}
```

Thus our example becomes:

```
var params = {
    size: 'small',
    color: 'red'
};

function carSentence(optionalParams) {
    var size = givenOrDefault(optionalParams.size, "medium");
    var color = givenOrDefault(optionalParams.color, "blue");
    var speed = givenOrDefault(optionalParams.speed, "fast");
    console.log("My favourite car is a " + size +
                " sized " + color + " one that goes " + speed);
}
carSentence(params);
// logs "My favourite car is a small sized red one that goes fast"
```


## Missing parameters

Another method of dealing with optional parameters is to simply allow them to be missing.

```
function carSentence(size, color, speed) {
    size = givenOrDefault(size, "medium");
    color = givenOrDefault(color, "blue");
    speed = givenOrDefault(speed, "fast");
    console.log("My favourite car is a " + size +
                " sized " + color + " one that goes " + speed);
}
carSentence("medium", "blue");
// logs "My favourite car is a medium sized blue one that goes fast"
```

This way of dealing with optional parameters works well if people won't bother trying to extend it past the limit. However, not all functions meet this requirement, consider the following:

```
function add(a, b, c) {
    a = a || 0;
    b = b || 0;
    c = c || 0;
    return a + b + c;
}

add(1, 2); // returns 3
add(1, 2, 3); // returns 6
add(1, undefined, 3); // returns 4
```

It kinda works. It'll fall over if you try `add(1, 2, 3, 4)` which returns 6 rather than 10.

## arguments

Finally we come to the `arguments` keyword. it looks like this:

```
function carSentence() {
    size = givenOrDefault(arguments[0], "medium");
    color = givenOrDefault(arguments[1], "blue");
    speed = givenOrDefault(arguments[2], "fast");
    console.log("My favourite car is a " + size +
                " sized " + color + " one that goes " + speed);
}
carSentence("medium", "blue");
// logs "My favourite car is a medium sized blue one that goes fast"
```

or like this:

```
function add() {
    var sum = 0;
    var index = 0;

    while(index < arguments.length) {
        if(typeof arguments[index] !== 'undefined') {
            sum = sum + arguments[index];
        }
        index++;
    }
    return sum;
}

add(1, 2); // returns 3
add(1, 2, 3); // returns 6
add(1, undefined, 3); // returns 4
add(1, 2, 3, 4); // returns 10
```

**What is this black magic?!**

Well it turns out `arguments` is a secret variable available in all functions that gives a list of the parameters passed to that function. It's a little bonus JS throws in free of charge.

**So it's an array of all the params**

Almost. It's not quite an array. It's like a kiddy array - hasn't got all the functionality just yet. If you want to use it for access only (as in the example above), then you're all good. But if you want to do interesting manipulations, `pop` things off, or reorder items, then you need to convert `arguments` to a full array:

```
var temp = Array.slice(arguments);
```

I assume the reason for this is to make `arguments` read only, although I haven't researched that.

And there you have it - three ways to handle optional parameters in JavaScript.

## Resources

* [Stackoverflow](http://stackoverflow.com/questions/148901/is-there-a-better-way-to-do-optional-function-parameters-in-javascript)
* [Mark Hansen](http://www.markhansen.co.nz/javascript-optional-parameters/)
* [Arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments) official
* [Arguments](https://javascriptweblog.wordpress.com/2011/01/18/javascripts-arguments-object-and-beyond/) this one is more entertaining