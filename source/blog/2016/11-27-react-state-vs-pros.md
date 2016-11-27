---
title: "ReactJS: Props vs. State"
tags: reactjs, js

description: A look into ReactJS's props and state work, with lots of examples!
---

I’ve been using ReactJS with Redux at work recently, and I have quite a few questions about how it all fits together. I figured I’d start small, with just some React questions and see how it goes.

This “props vs. state” question is [pretty common](http://stackoverflow.com/search?q=%5Breactjs%5D+state+props) for new React devs - they look so similar, but are used differently. So what’s going on there?

## Props

*What does “props” even mean?*

To get the jargon out of the way, “props” is short for “properties” so nothing particularly fancy there.

*Well, all right then. What makes props special?*

### `props` are passed into the component

Here’s an example (code from the [React Guide](https://facebook.github.io/react/docs/components-and-props.html)):

```
class Welcome extends React.Component {
  render() {
    return <h1>Hello {this.props.name}</h1>;
  }
}

const element = <Welcome name="Sara" />;
```

You can play with this on [CodePen](https://codepen.io/anon/pen/aByERM?editors=1011).

The line `<Welcome name="Sara" />` creates a property `name` with value `"Sara"`. 

*That sounds kinda like a function call...*

Yep, the property is passed to the component, similar to how an argument is passed to a function. In fact, we could even rewrite the component to be simpler:

```
function Welcome(props) {
  return <h1>Hello {props.name}</h1>;
}
```

Now the “props as arguments” comparison is even clearer.

*OK, so props “come from above.”*

Often, but not always. A component can also have default props, so if a prop isn’t passed through it can still be set.

We can make the `name` property optional by adding `defaultProps` to the `Welcome` class:

```
class Welcome extends React.Component {
  render() {
    return <h1>Hello {this.props.name}</h1>;
  }
}

Welcome.defaultProps = {
  name: "world",
};
```

If `Welcome` is called without a name it will simply render `<h1> Hello world</h1>`.

So `props` can come from the parent, or can be set by the component itself.

### `props` should not change

*What?! I’ve totally done that!*

You used to be able to change `props` with `setProps` and `replaceProps` but these have been [deprecated](https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html#new-deprecations-introduced-with-a-warning). During a component’s life cycle `props` should not change (consider them immutable).

*Fine, I won’t change props any more.*

Since `props` are passed in, and they cannot change, you can think of any React component that only uses `props` (and not `state`) as “pure,” that is, it will always render the same output given the same input. This makes them really easy to test - win!

## State

Like `props`, `state` holds information about the component. However, the kind of information and how it is handled is different.

By default, a component has no state. The `Welcome` component from above is stateless:

```
function Welcome(props) {
  return <h1>Hello {props.name}</h1>;
}
```

*So when would you use state?*

When a component needs to keep track of information between renderings the component *itself* can create, update, and use state.

We’ll be working with a fairly simple component to see `state` working in action. We’ve got a button that keeps track of how many times you’ve clicked it.

*Yawn...*

I know, but here’s the code:

```
class Button extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }

  updateCount() {
    const newCount = this.state.count + 1;
    this.setState({
      count: newCount
    });
  }

  render() {
    return (<button
              onClick={this.updateCount.bind(this)}
            >
              Clicked {this.state.count} times
            </button>);
  }
}
```

You can play with this code on [CodePen](https://codepen.io/anon/pen/WoEdNx?editors=1011).

*Gah! There’s so much there! What’s going on?*

So now we’re working with `state` things are a bit more complicated. But we’ll break it down to make it more understandable.

Our first real difference between `props` and `state` is that...

### `state` is created in the component

Let’s look at the `constructor` method:

```
constructor() {
  super();
  this.state = {
    count: 0,
  };
}
```

This is where `state` gets it’s initial data. The inital data can be hard coded (as above), but it can also come from `props`.

*Well that’s just confusing.*

It is, I know. But it makes sense - you can’t change `props`, but it’s pretty reasonable to want to do stuff to the data that a component receives. That’s where state comes in.

Moving on brings us to our second difference...

### `state` is changeable

Here’s `updateCount` again:

```
updateCount() {
  const newCount = this.state.count + 1;
  this.setState({
    count: newCount
  });
}
```
We change the state to keep track of the total number of clicks. The important bit is `setState` - this updates the state object **and** re-renders the component.

*Boom!*

Yeah, this is pretty great of React to do, no need for us to explicitly re-render or worry about anything. React will take care of it all!

**Warning!**

It is tempting to write `this.state.count = newCount`. *Do not do this!* React cannot listen to the state getting updated in this way, so your component will not re-render. Always use `setState`.

And finally, `render`

```
render() {
  return (<button
            onClick={this.updateCount.bind(this)}
          >
            Clicked {this.state.count} times
          </button>);
}
```

`onClick={this.updateCount.bind(this)}` means that when the button is clicked the `updateCount` method will be called. We need to use [bind](/blog/2014/function-prototype-bind/) so `updateCount` will have access to this instance’s `state`.

The text rendered in the button is `Clicked {this.state.count} times`, which will use whatever `this.state.count` is at the time of rendering.

*Phew! That was a lot! Can I have it one more time?*

Sure thing, let’s look at the whole flow:

1. The component is initialised and `state.count` is set to 0

  ```
    this.state = {
      count: 0,
    };
  ```

2. The component renders, with “Clicked 0 times” as the button text

  ```
    Clicked {this.state.count} times
  ```

3. The user clicks the button
  
  *click!*

4. `updateCount` is called, bound to this instance of the component
  
  ```
  onClick={this.updateCount.bind(this)}
  ```

5. `updateCount` calls `setState` with `{count: 1}` as the argument
  
  ```
  this.setState({
    count: newCount
  });
  ```

6. `setState` triggers a call to `render`
  
  *React magic!*

7. The component renders, with “Clicked 1 times” as the button text
  
  ```
  Clicked {this.state.count} times
  ```

## Review

While `props` and `state` both hold information relating to the component, they are used differently and should be kept separate.

`props` contains information set by the parent component (although defaults can be set) and should not be changed.

`state` contains “private” information for the component to initialise, change, and use on it’s own.

> ... props are a way of passing data from parent to child. ... State is reserved only for interactivity, that is, data that changes over time. 

– Facebook's [React Guide](https://facebook.github.io/react/docs/thinking-in-react.html).

## Resources
* Amazing guide on [state vs. props](https://github.com/uberVU/react-guide/blob/master/props-vs-state.md)
* Stackoverflow [question](http://stackoverflow.com/questions/23481061/reactjs-state-vs-prop)
* Docs on [Components and Props](https://facebook.github.io/react/docs/components-and-props.html)
* Docs on [State and Lifecycle](https://facebook.github.io/react/docs/state-and-lifecycle.html)



