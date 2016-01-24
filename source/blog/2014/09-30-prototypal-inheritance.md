---
title: "JS prototypal inheritance"
tags: js, interview-questions
---

## Explain how prototypal inheritance works

JS objects each have a “hook” to its parent object, or prototype. Obviously everything the child object defines it has access to, but it also can climb up the prototype tree to access its parent’s (or ancestor’s) methods and properties.

**(the obligatory animal) Example:**

```
function Animal(){
  this.alive = true;
}

function Mammal() {
  this.warmBlooded = true;
  this.hasTail = false;
  this.move = function(){
    if(this.hasTail){
      return "Moving with tail";
    } else {
      return "Moving with tail";
    }
  };
}
Mammal.prototype = new Animal();

function Cat(name) {
  this.sound = 'Meow';
  this.hasTail = true;
  this.name = name;
  this.greet = function() {
    return "Hello, I'm " + this.name;
  };
}
Cat.prototype = new Mammal();

var mittens = new Cat('Mittens');

mittens.sound; // returns 'Meow' (as defined on Cat)

mittens.hasTail; // returns true (as defined on Cat)
  // Although Mammal also defines hasTail, the Cat's
  // definition takes precidence

mittens.warmBlooded; // returns true (as defined on Mammal)

mittens.alive; // returns true (as defined on Animal)

mittens.greet() // returns "Hello, I'm Mittens"
  // greet() accesses the "name" attribute defined on Cat

mittens.move() // returns "Moving with tail"
  // move() accesses the "hasTail" attribute which is defined
  // on Cat and Mammal. Although Mammal defines the move function
  // "this" refers to mittens, so move() uses mitten's "hasTail"
  // attribute, which is set to true
```

There’s a longer explaination from [Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain).