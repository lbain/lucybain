---
title: "React JS: what is a PureComponent?"
tags: react, js, performance

description: A discussion of what a pure component is in React, and how it differs from a traditional component.
keywords: react, js, PureComponent, pure component
---

Early on, React developers had the idea of “pure” components. This concept went by a variety of names (stateful/pure, smart/dumb, container/presentational, etc.) but were all fairly similar. These components still used the `React.Component` class, but the idea provided a useful mental model for developers to work with. 

But then on June 29, 2016 React 15.3 was released a new `PureComponent` class. The `PureComponent` kind of summed up the previous concept of “pure” components, and put a large speed boost in as well. This article is about the `PureComponent` class, and only touches on the “pure” component mental model. I’ve added some links in the references section to cover why the idea of “pure” components is useful. Because of `PureComponent`’s emphasis on performance, this is also a continuation from my previous article about [when React re-renders](/blog/2017/react-js-when-to-rerender/) (I recommend reading that one first if you haven’t already).

### What problem does it solve?

By default, a plain `React.Component` has `shouldComponentUpdate` set to always return `true`. This is good because it means React errs on the side of always updating the component in case there’s any new data to show. However, it’s bad because it means React might trigger unnecessary re-renders. One way to deal with these extra re-renders is to change the `shouldComponentUpdate` function to check when your component needs to update (see my [previous post](/blog/2017/react-js-when-to-rerender/) for more information).

Another way to stop extra re-renders is to use a `PureComponent`. Let’s build out the example from the previous performance post...

### Example setup

**Note:** I’ve written intentionally bad code in the `componentDidMount` methods throughout. This is to keep the examples small and to show some gotchas along the way. Please do not write this kind of code for reals!

```jsx
class Todos extends React.PureComponent {
  
    constructor(props) {
        super(props);
        this.state = { 
            todos: [
                { title: 'take out the trash', done: false, notes: ['boring'] },
                { title: 'walk dog', done: true, notes: ['exercise'] },
                { title: 'read about React', done: false, notes: ['fun!'] },
            ]
        };
    }

    componentDidMount() {
        setInterval(() => {
            this.setState((oldState) => {
                return { todos: [...oldState.todos] }
            });
        }, 1000);
    }

    render() {
        console.log('Todos render called');
        return (<div>
            {this.state.todos.map((todo, i) => {
              return (<TodoItem
                key={i}
                title={todo.title}
                done={todo.done}
                notes={todo.notes}
              />);
            })}
          </div>);
    }
}

class TodoItem extends React.Component {

    render() {
        console.log('TodoItem render called');
        return (<div>
                {this.props.done ? '✓': '▢'} {this.props.title}
                ({this.props.notes.join(', ')})
            </div>);
    }
}

ReactDOM.render(<Todos />, document.getElementById('app'));
```

It’s bigger than most of the examples I write, but it’s all relevant - promise! We’ll break it down (feel free to skip down to the next section if the above is clear to you already):

#### `Todos`

First we have a React component, this is the one that `ReactDOM` will render (see the last line in the example).

We have the constructor method so we can set the initial state - in this case an array of `todos`, each of which has `title`, `done`, and `notes` attributes. (Typically this kind of state would be passed in through `props` but I’ve written it in the `state` to keep the example smaller and self contained.)

```jsx
constructor(props) {
    super(props);
    this.state = { 
        todos: [
            { title: 'take out the trash', done: false, notes: ['boring'] },
            { title: 'walk dog', done: true, notes: ['exercise'] },
            { title: 'read about React', done: false, notes: ['fun!'] },
        ]
    };
}
```

Then there’s the `componentDidMount` method. Its only purpose is to change the state every second so we can see how React deals with those changes. Right now it updates `state.todos` to be the same as the previous `state.todos`.

```jsx
componentDidMount() {
    setInterval(() => {
        this.setState((oldState) => {
            return { todos: [...oldState.todos] }
        });
    }, 1000);
}
```

Finally `Todos` has the render method. It renders a list of the `TodoItem` components, and passes in their respective `title`, `done`, and `notes` attributes. The main thing we’re interested in here is seeing when this component is rendered. 

```jsx
render() {
    console.log('Todos render called');
    return (<div>
        {this.state.todos.map((todo, i) => {
            return (<TodoItem
            key={i}
            title={todo.title}
            done={todo.done}
            notes={todo.notes}
            />);
        })}
        </div>);
}
```

#### `TodoItem`

*It’s a lot simpler than `Todos`* 

Yes, that’s right `TodoItem` inherits from `React.Component` just like `Todos`, but it only implements the `render` function (which is required) to display the `title`, `done`, and `notes` values. Here again we’re mostly interested in knowing *when* the `render` method is called, not really what is displayed (yet!).

```jsx
render() {
    console.log('TodoItem render called');
    return (<div>
            {this.props.done ? '✓': '▢'} {this.props.title}
            ({this.props.notes.join(', ')})
        </div>);
}
```

### What’s the problem?

Well, if you [look at it yourself](https://codepen.io/lbain/pen/GyOXye) you’ll see the console spits out:

```
Todos render called
TodoItem render called
TodoItem render called
TodoItem render called
Todos render called
TodoItem render called
TodoItem render called
TodoItem render called
```
Over and over, every second.

*That seems silly, the data isn’t even changing!*

You’re right - there’s no need to re-render any of these components because the data doesn’t change. But React doesn’t know this - the `setState` method from the `onComponentDidmount` triggers a re-render every second for the `Todos` component and its children.

### How do we re-render less?

Let’s focus on `TodoItem` for now. It’s rendering three times for each `Todos` render so we can optimise it first. We’ll talk about `Todos` later on.

*How can we fix `TodoItem` re-rendering too much?*

That brings us nicely to the `React.PureComponent` this post is supposed to be all about. The `TodoItem` doesn’t need to re-render since none of its data changes. The `props` coming in each time are the same, and there’s no internal `state`. Let’s try converting `TodoItem` to a `React.PureComponent`:

```jsx
class TodoItem extends React.PureComponent { // This line changed

    render() {
        console.log('TodoItem render called');
        return (<div>
                {this.props.done ? '✓': '▢'} {this.props.title}
                ({this.props.notes.join(', ')})
            </div>);
    }
}
```

If you make that change in the [CodePen](https://codepen.io/lbain/pen/GyOXye) you’ll see the following in the console:

```
Todos render called
TodoItem render called
TodoItem render called
TodoItem render called
Todos render called
Todos render called
Todos render called
Todos render called
...
```

After the initial `TodoItem`s render, they never render again *even though their parent renders multiple times.*

**Boom.**

Did you catch that? We just saved ourselves a *bunch* of unnecessary `TodoItem` renders simply by converting it to a `PureComponent`. Aw yeah.

### How does `PureComponent` work?

*Ok, you’ve had your big reveal. How does it actually work?*

You know how we’d normally need to write our own `shouldComponentUpdate` to check if the component should re-render or not? Well, React has written that check for us in `PureComponent`. The [relevant shouldComponentUpdate code](https://github.com/facebook/react/blob/9d310e0bc7b9d5ce39d82536dfcb67f98462a346/packages/react-test-renderer/src/ReactShallowRenderer.js#L170-L173) is:

```js
if (type.prototype && type.prototype.isPureReactComponent) {
    shouldUpdate = !shallowEqual(oldProps, props) ||
                   !shallowEqual(oldState, state);
}
```

**Note:** React checks both `props` and `state`. Throughout this article I focus on `state` because it makes the examples easier and self contained, however it’s important to note that everything we talk about here equally applies to `props`.

[Here](https://github.com/facebook/fbjs/blob/c69904a511b900266935168223063dd8772dfc40/packages/fbjs/src/core/shallowEqual.js) is the code for that `shallowEqual` function. Of particular interest is the [method documentation](https://github.com/facebook/fbjs/blob/c69904a511b900266935168223063dd8772dfc40/packages/fbjs/src/core/shallowEqual.js#L35-L37):

> Performs equality by iterating through keys on an object and returning false when any key has values which are not strictly equal between the arguments. Returns true when the values of all keys are strictly equal.

*But wait, what does “strictly equal” mean?*

That is a **very** good question, so we’ll dedicate a whole section to it.

### Side note: shallow equality

Feel free to skip if this isn’t new for you.

A *shallow* equality check means that JS only checks that the value’s object *ids* (as in, the memory address for where JS stores the information for that particular object) are the same, not that their *content* is the same. So here’s an example where shallow equality is what you and I would usually think of as “equal”:

```
const value = 'cat';

const item1 = value;
const item2 = value;

console.log(item1 === item2); // true
```

And here’s an example where JS’s definition of “equal” and our definition might differ:

```
const value = 'cat';

const array1 = [value];
const array2 = [value];

console.log(array1 === array2); // false
```

Even though we can clearly see the *content* of `array2` is the same as `array1` JS registers them as different since their *ids* are different. In this case we created two completely separate arrays, that just happened to have the same data in them.

*What’s the alternative?*

We can check inside each item and see if all the values are the same - this is called a “deep” equality check. Something like this:

```js
const value = 'cat';

const array1 = [value];
const array2 = [value];

let equal = true;
array1.forEach((item, index) => {
    equal = equal && array1[index] === array2[index];
});

console.log(equal); // true
```

*Why would shallow equality ever be useful?*

Well, it’s *really* fast. In the previous example we have to loop through every single item in the array to find that the arrays are equal. Assuming you’ve got more than one thing in your array that gets slow quickly.

### Warning: PureComponent does a shallow equality check

React uses a shallow equality check because it is is *way* more performant than doing a deep equal. In fact, React doesn’t even offer doing a deep equality check. You can do a shallow check (with `PureComponent`), write your own check (with `shouldComponentUpdate`), or not check at all and just always re-render (the default). It’s too risky for React to do a deep equality check since you might have really deeply nested data. Instead React errs on the side of not checking and doing the re-render automatically.

All if this is generally good news if your component is working with shallow-equality-friendly data. If the  `state` and `prop` value ids change when their content changes then the components re-render when the should - yay! However, if you don’t handle your data properly, then you can accidentally not re-render when you should - boo!

*Could you give an example?*

As it happens, we already have one ready to go! Let’s leave `TodoItem` as a `PureComponent`, and change `Todo`'s `componentDidMount` to mess with some data:

```js
componentDidMount() {
    setInterval(() => {
        this.setState((oldState) => {
            oldState.todos[0].done = !oldState.todos[0].done; // new line
            return { todos: [...oldState.todos] }
        });
    }, 1000);
}
```

If you run this you’ll see the “done” state for the first todo item flash on and off every second. This is good news - we’re updating the data and it’s displaying properly.

But... let’s try this one:

```js
componentDidMount() {
    setInterval(() => {
        this.setState((oldState) => {
            oldState.todos[0].notes.push('smelly'); // new line
            return { todos: [...oldState.todos] }
        });
    }, 1000);
}
```
The first todo item *should* re-render every second with a new “smelly” note displaying. But it doesn’t, there’s just the initial render (without the “smelly” note), and that’s it.

*Why doesn’t React re-render?*

Because doing a `push` on an array [does *not* create a *new* array.](http://gunnariauvinen.com/difference-between-concat-and-push-in-javascript/) When React does the shallow equality check for the `PureComponent` it only checks `oldState.notes === newState.notes`, which is `true` *even though* the data in `notes` has changed. In order to render this properly we need to change `TodoItem` back to a `React.Component`, **or** we can use `forceUpdate` to tell React that the data actually has changed. However using `forceUpdate` is kind of a code smell, so I won’t cover it here.

### Warning: think of the children!

A common pitfall when converting from `Component` to `PureComponent` is to forget that the children need to re-render too. As with all React - if the parent doesn’t re-render the children won’t either. So if you have a `PureComponent` with children, those children can only update if the parent’s `state` or `props` are shallowly different (causing the parent to re-render).

You can only have a `PureComponent` parent if you know none of the children should re-render if the parent doesn’t re-render. Let’s see an example of this pitfall by converting the `Todos` component from a `Component` to a `PureComponent` :

```js
class Todos extends React.PureComponent { // new line
    // ...

    componentDidMount() {
        setInterval(() => {
            this.setState((oldState) => {
                oldState.todos[0].done = !oldState.todos[0].done; // new line
                return oldState; // new line
            });
        }, 1000);
    }

    // ...
}
```

As you can see, most of the code is the same. We’ve changed `Todos` to be a `PureComponent` and the `componentDidMount` to return the original `oldState` object rather than creating a new object (as before).

Now we *should* see the first todo item flashing its `done` state on and off. But it doesn’t, again there is only the initial render and that’s it. This happens because `Todos` is now a `PureComponent`, when the shallow equal check happens with `oldState === newState` we find exactly the same object (again, even though the content of that object has changed). So `Todos` never re-renders, so its *children* also never re-render. We can fix this really easily by simply changing `Todos` back to a `Component`.

---

### Wrapping up

`PureComponent` is very powerful in that it can help you limit the number of unnecessary re-renders that occur. However, it can also cause surprising gotchas. The key thing to keep in mind is that `PureComponent` only does a shallow equality check on `props` and `state` before deciding if it should re-render or not. And that has a cascade effect on if its children re-render or not. So use `PureComponent` and love the performance gains, but be sure to check that it is always re-rendering when it should. When in doubt fall back to a `Component` instead.

### Resources

I read a *lot* of posts and questions about `PureComponent`, `Component`, and `shouldComponentUpdate` for this, so the below is not a complete list of resources. Hopefully they’re the most useful though!

* [React docs](https://reactjs.org/docs/react-api.html#reactpurecomponent)
* [StackOverflow](https://stackoverflow.com/questions/41340697/react-component-vs-react-purecomponent)
* [Rob Wise](https://blog.shakacode.com/react-purecomponent-pitfalls-d057882f4b6e) lists more pitfalls of using `PureComponent` - a good one to check if your `PureComponents` are rendering *more* than you’d expect (whereas I focused on not triggering re-renders enough)
* [Grgur Grisogono](https://medium.com/modus-create-front-end-development/component-rendering-performance-in-react-df859b474adc) did some performance testing on `PureComponent`
* [Dan Abramov](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) and [Jake Trent](https://jaketrent.com/post/smart-dumb-components-react/) discuss what “pure” components are