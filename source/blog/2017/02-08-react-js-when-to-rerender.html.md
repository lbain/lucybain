---
title: How does React decide to re-render a component?
tags: react, js, performance

description: React re-renders if store changes or if shouldComponentUpdate returns true. How can we use this knowledge to help performance?
keywords: react, js, performance
---

React is known for it’s performance. Because it has a virtual DOM and only updates the real DOM when required it can be much faster than updating the DOM all the time, even to display the same information. However, React’s “smarts” only go so far (at the moment!), and it’s our job to know it’s expectations and limitations so we don’t accidentally hurt performance.

One of the aspects we need to be aware of is how React decides when to re-render a component. Not as in, update the DOM render, but just to call the `render` method to change the virtual DOM. We can help React out by knowing when it thinks it should render, and by giving it some more “smarts.” Let’s look at both of those in turn...

## 1. Data in the store changes

Most React components get their data from the store (often using Redux or a flux implementation). This data gets passed into the components and tells the components what to render. However, before rendering, React does a check to see if the object is “different” and therefore, if the it’s worth it to go through with the render. React does a simple equality check to decide which components to re-render. Something along the lines of:

```
shouldBotherRendering(oldStoreObj, newStoreObj) {
    return oldStoreObj === newStoreObj;
}
```

*That doesn’t look legit*

It’s not — that’s completely contrived, although I do like the idea of a method called `shouldBotherRendering`!

If React believes the object has changed it will re-render the component. From our example, the rendering happens when `oldStoreObj === newStoreObj` is `false` .

The important thing to note in this example is the `===` which is used to check equality between the two objects. React doesn’t check the *content* of the objects, only if the objects have the same *reference*. (If this doesn’t sound familiar or make sense yet please check out this [article](http://adripofjavascript.com/blog/drips/object-equality-in-javascript.html) which explains object equality checks in JS more fully.)

So you can have *different* objects with all the *same* content. That is, two objects that would *render* the same thing in React can still register as being different and trigger a re-render. Here’s a quick example:

```
const oldStoreObj = {
    title: 'take out the trash',
    done: false,
};

const newStoreObj = {
    title: 'take out the trash',
    done: false,
};

console.log('same?', oldStoreObj === newStoreObj); // same? false
```

*huh. How can we know if the two objects are “really” different?*

To test an object’s properties (and the properties of those properties, remember an object can have objects nested inside it) you can check for **deep equality**. That is, are the two objects the same all the way down. I’ve worked with [lodash](https://lodash.com/)’s [isEqual](https://lodash.com/docs/4.17.4#isEqual) to test objects for deep equality though there are [loads](http://stackoverflow.com/questions/1068834/object-comparison-in-javascript) of ways to do this test. You can run the following code on lodash’s site so you have access to the the library:

```
const oldStoreObj = {
    title: 'take out the trash',
    done: false,
};

const newStoreObj = {
    title: 'take out the trash',
    done: false,
};

console.log('same?', _.isEqual(oldStoreObj, newStoreObj));
// same? true
```

*Ok, but what about React?*

When developing, it’s important to make the distinction between store objects having a different reference vs. having different content. This way you’ll have more control over when React renders and save some unnecessary rendering.

Sometimes you’ll know that getting new data to process should trigger a re-render. For example, if a user has clicked a button (perhaps to mark a todo as “done”) then you’ll want to display that change. Here’s some sample code to show changing the store’s object:

```
const store = [
    { title: 'make the bed',
      done: false },
    { title: 'take out the trash',
      done: false },
]

function chagneStore(index, changedTodo) {
    store[index] = changedTodo;
}

function toggleDone(index) {
    const oldTodo = store[index];
    const newTodo = {
        ...oldTodo,
        done: !oldTodo.done
    };
    chagneStore(index, newTodo);
}

const oldTodo = store[0];
toggleDone(0);
const newTodo = store[0];
console.log('same?', oldTodo === newTodo); // same? false
```

Other times you might get duplicate data (perhaps from polling the server for an update) or have data that changes but which doesn’t impact what the user sees.

By default, if we use similar code to above, React will re-render the component even though the change doesn’t impact the final HTML.

```
const store = [
    { title: 'make the bed',
      done: false },
    { title: 'take out the trash',
      done: false },
]

function chagneStore(index, changedTodo) {
    store[index] = changedTodo;
}

function updateUnseenText(index, text) {
    const oldTodo = store[index];
    const newTodo = {
        ...oldTodo,
        unseen: text
    };
    chagneStore(index, newTodo);
}

const oldTodo = store[0];
updateUnseenText(0, "can't see me!");
const newTodo = store[0];
console.log('same?', oldTodo === newTodo); // same? false
```

This is annoying because we triggered a render that we didn’t need. `unseen` doesn’t change the HTML at all, but React doesn’t know this until the render completes. We wasted a whole cycle for useless data!

*I want a fast site! How can we avoid that?*

Since we don’t want to trigger a re-render, we need to update the object in the store (change it’s data) without replacing it (leave the reference the same).

Let’s look at an example:

```
const store = [
    { title: 'make the bed',
      done: false },
    { title: 'take out the trash',
      done: false },
]

function changeUnseen(index, text) {
    store[index].unseen = text;
}

const oldTodo = store[0];
changeUnseen(0, "can't see me!");
const newTodo = store[0];
console.log('same?', oldTodo === newTodo); // same? true
```

This time we changed the property `unseen` directly on the store object without replacing the object. React doesn’t register the change because `oldTodo === newTodo` is `true`.

Sometimes doing this kind of data update can be really annoying. Imagine having many todo items and that `unseen` was deeply nested in the object. It would be difficult to make sure you update the right todo with the right change and do so consistently enough so you never re-render unnecessarily.

*Yeah, that sounds painful... Is there a better way?*

Well, what do you know? There is!

## 2. `shouldComponentUpdate` method

Instead of “tricking” React into thinking a component hasn’t changed you can tell React which bits you actually care about. You can do this in the `shouldComponentUpdate` method of your component.

When React comes to render the component it will first check if `shouldComponentUpdate` is defined and, if so, if it returns true (the component should update, a.k.a. re-render) or false (React can skip the re-render this time.)

When you use `shouldComponentUpdate` you’ll need to decide which bits of data actually mater for the re-render. Let’s go back to our example:

```
class Todo extends React.Component {
    shouldComponentUpdate(nextProps) {
        const differentTitle = this.props.title !== nextProps.title;
        const differentDone = this.props.done !== nextProps.done
        return differentTitle || differentDone;
    }

    render() {
        return (<div>...</div>);
    }
}
```

As you can see, we only want to re-render the Todo if the `title` or `done` attributes have changed. We don’t care if `unseen` has changed, so we don’t include it in `shouldComponentUpdate`.

When React comes to render a Todo component it will first check for object equality using `===` as discussed above. Assuming the objects are different (as in, a different reference) React will check the `shouldComponentUpdate` on the Todo component. React will evaluate if `shouldComponentUpdate` is true or false, and decide to render from there.

With this updated code we can use `updateUnseenText` from above which replaces the object (thus creating a new reference) and still not trigger a re-render.

*Seems like a lot of work to define all that...*

It can be. This example is especially verbose because there are two properties we care about (`title` and `done`) and only one we are happy to ignore (`unseen`). Depending on your data it might make more sense to check for just one or two properties and ignore a whole bunch.

**Important note**

> Returning false does not prevent child components from re-rendering when *their* state changes.
 
– Facebook's [React docs](https://facebook.github.io/react/docs/react-component.html#shouldcomponentupdate).


## Bonus: simple performance testing

Writing and running computations in `shouldComponentUpdate` can be expensive so you should to make sure they’re worth the time. Before writing any `shouldComponentUpdate`s you can check how many wasted cycles React does by default (using just `===` checking). With this information to guide you, you can make informed decisions about which components are re-rendering too often and causing performance problems.

Use React’s [Performance Tools](https://facebook.github.io/react/docs/perf.html) to find wasted cycles:


```
Perf.start()
// Do the render
Perf.stop()
Perf.printWasted()
```

Which components wasted a lot of render cycles? How can you make them smarter with `shouldComponentUpdate`? Try some ways and be sure to check them against each other with the performance tools!

## Resources

Many thanks to my co-worker [Marcin](https://twitter.com/MarcinS) for explaining how the initial `===` check works.

* React’s docs on [shouldComponentUpdate](https://facebook.github.io/react/docs/react-component.html#shouldcomponentupdate)
* React’s [Performance Tools](https://facebook.github.io/react/docs/perf.html)
* Article on [object equality](http://adripofjavascript.com/blog/drips/object-equality-in-javascript.html)