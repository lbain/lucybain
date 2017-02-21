---
title: How does React decide to re-render a component?
tags: react, js, performance

description: React re-renders if shouldComponentUpdate returns true for any reason. How can we use this knowledge to help performance?
keywords: react, js, performance
---

React is known for it’s performance. Because it has a virtual DOM and only updates the real DOM when required it can be much faster than updating the DOM all the time, even to display the same information. However, React’s “smarts” only go so far (at the moment!), and it’s our job to know it’s expectations and limitations so we don’t accidentally hurt performance.

One of the aspects we need to be aware of is how React decides when to re-render a component. Not as in “update the DOM render,” but just to call the `render` method to change the virtual DOM. We can help React out by telling it when it should and shouldn’t render. Let’s look at both of those in turn...

## 1. The component’s state changes

A re-render can only be triggered if a component’s state has changed. The state can change from a `props` change, or from a direct `setState` change. The component gets the updated state and React decides if it should re-render the component. Unfortunately, by default React is incredibly simplistic and basically re-renders everything all the time.

Component changed? Re-render. Parent changed? Re-render. Section of props that doesn't actually impact the view changed? Re-render.

```
class Todo extends React.Component {

    componentDidMount() {
        setInterval(() => {
            this.setState(() => {
                console.log('setting state');
                return { unseen: "does not display" }
            });
        }, 1000);
    }

    render() {
        console.log('render called');
        return (<div>...</div>);
    }
}
```

In this (massively contrived) example the `Todo` will re-render every second, even though the `render` method doesn’t use `unseen` at all. In fact, `unseen` doesn’t even change it’s value! You can check out a working version of this on [CodePen](https://codepen.io/lbain/pen/MJNpwL).

*Well, but re-rendering all the time isn’t helpful...*

I mean, I appreciate that React is being super careful. It would be worse if the state changed and the component *didn’t* render when it was supposed to. How would I know about that new message my friend sent me?! I’d miss it, so she’d probably assume it was intentional, then she’d stop talking to me, and the whole friendship would be ruined. All for the want of a little green dot not re-rendering. High stakes. Re-rendering is definitely the safe option.

*But re-rendering seems expensive (and your example is melodramatic)*

Yes, re-rendering unnecessarily does waste cycles and is generally not a good idea. However, React can’t “just know” when it’s safe to ignore parts of the state. So it plays it safe and re-renders whenever there’s a change to the state, important or not.

*How can we tell React to skip re-rendering?*

Well that brings us nicely to point two...

## 2. `shouldComponentUpdate` method

By default, `shouldComponentUpdate` returns `true`. That’s what causes the “update everything all the time” we saw above. However, you can overwrite `shouldComponentUpdate` to give it more “smarts” if you need the performance boost. Instead of letting React re-render all the time, you can tell React when you *don’t* want to trigger a re-render.

When React comes to render the component it will run `shouldComponentUpdate` and see if it returns `true` (the component should update, a.k.a. re-render) or `false` (React can skip the re-render this time). So you’ll need to overwrite `shouldComponentUpdate` to return `true` or `false` as needed to tell React when to re-render and when to skip.

When you use `shouldComponentUpdate` you’ll need to decide which bits of data actually matter for the re-render. Let’s go back to our example:

```
class Todo extends React.Component {

    componentDidMount() {
        setInterval(() => {
            this.setState(() => {
                console.log('setting state');
                return { unseen: "does not display" }
            });
        }, 1000);
    }

    shouldComponentUpdate(nextProps) {
        const differentTitle = this.props.title !== nextProps.title;
        const differentDone = this.props.done !== nextProps.done
        return differentTitle || differentDone;
    }

    render() {
        console.log('render called');
        return (<div>...</div>);
    }
}
```

As you can see, we only want to re-render the Todo if the `title` or `done` attributes have changed. We don’t care if `unseen` has changed, so we don’t include it in `shouldComponentUpdate`.

When React comes to render a Todo component (as triggered by the `setState`) it will first check if the state has changed (via the `props` or `state`). Assuming the state is different (which it will be because we made an explicit `setState` call) React will check the `shouldComponentUpdate` on the Todo component. React will evaluate if `shouldComponentUpdate` is true or false, and decide to render from there.

With this updated code the `setState` will still be called every second, but the `render` will only happen on the initial load (or when the `title` or `done` properties change). You can see this happening [here](https://codepen.io/lbain/pen/qReraZ).

*Seems like a lot of work to define all that...*

It can be. This example is especially verbose because there are two properties we care about (`title` and `done`) and only one we are happy to ignore (`unseen`). Depending on your data it might make more sense to check for just one or two properties and ignore a whole bunch.

**Important note**

> Returning false does not prevent child components from re-rendering when *their* state changes.
 
– Facebook's [React docs](https://facebook.github.io/react/docs/react-component.html#shouldcomponentupdate).

This applies to the children’s `state` but not their `props`. So if a child component is internally managing some aspect of it’s state (with a `setState` of it’s own), that will still be updated. But if the parent component returns `false` from `shouldComponentUpdate` it will not pass the updated `props` along to it’s children, and so the children will not re-render, even if their `props` had updated.


## Bonus: simple performance testing

Writing and running computations in `shouldComponentUpdate` can be expensive so you should to make sure they’re worth the time. Before writing any `shouldComponentUpdate`s you can check how many wasted cycles React does by default. With this information to guide you, you can make informed decisions about which components are re-rendering too often and causing performance problems.

Use React’s [Performance Tools](https://facebook.github.io/react/docs/perf.html) to find wasted cycles:

```
Perf.start()
// Do the render
Perf.stop()
Perf.printWasted()
```

Which components wasted a lot of render cycles? How can you make them smarter with `shouldComponentUpdate`? Try some ways and be sure to check them against each other with the performance tools!

## Resources

Many thanks to my co-worker [Marcin](https://twitter.com/MarcinS) for explaining how React makes these decisions.

* React’s docs on [shouldComponentUpdate](https://facebook.github.io/react/docs/react-component.html#shouldcomponentupdate)
* React’s [Performance Tools](https://facebook.github.io/react/docs/perf.html)
* Article on [object equality](http://adripofjavascript.com/blog/drips/object-equality-in-javascript.html)