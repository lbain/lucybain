---
published: false
---

For our example, we used these rules to build out dinner:

1. We need to roast a chicken *and* veggies
2. The roasting for both items should start at the same time (our oven has space for both and we want to decrease the total cooking time)
3. We can only start setting the table *after* the chicken and veggies have finished roasting.

Last time we weren’t using promises, and the code ended up being quite clunky. The rest of this series focuses on cleaning up that clunkiness using Promises.

*But where do `resolve` and `reject` come from?*

These names are conventional, but you can call them something else. The important thing to note is that the `Promise` constructor takes a function, which takes two arguments.

*How do you know when to call `resolve` or `reject`?*

Basically call `resolve` when you’re on the happy path, and `reject` when there’s been an error.

*So, it’s a fancy call back wrapper for no reason?*

Not quite! My example above is, but typically a Promise would do more than just check for `true`. Let’s build a slightly more complicated example:

```
new Promise((resolve, reject) => {
  console.log('Making turkey');

  setTimeout(() => {
    if (true) {
      resolve('turkey - done!');
    } else {
      reject('turkey - burnt!');
    }
  }, 1000);
})
```

Ok, so as you can see, this Promise uses a `setTimeout` to simulate roasting our turkey just like in our previous example. As you can see, we call `resolve` with the happy case (a well cooked turkey), and we call `reject` to signal an error (a burnt turkey). Thankfully, we’re still checking `if (true)` so our turkey will never burn.

*There’s no output when I run it in the console. Where’s the logging?*

Ah, excellent point! We haven’t written it — yet. Now we’re getting into the magic of promises. Let’s add some code to see the results of this Promise.

```
new Promise((resolve, reject) => {
  console.log('Making turkey');

  setTimeout(() => {
    if (true) {
      resolve('turkey - done!');
    } else {
      reject('turkey - burnt!');
    }
  }, 1000);
}).then((result) => {
  console.log("Success! " + result);
}).catch((error) => {
  console.log("Failure! " + error);
});
```

Given what we know about `resolve` being the happy case, `reject` dealing with errors, and `if (true)` always executing, what do you think the above code will log? Take your time and try to reason it out. Don’t worry, I’ll wait.

- - -

You can run this code on [CodePen](https://codepen.io/lbain/pen/WoPOJK) to see for yourself. This code will log `Making turkey` and then, after a short pause `Success! turkey - done!`.

*I understand why `Making turkey` gets logged, but how does `turkey - done!` get from the `resolve` line to the console?*

The `.then` gets triggered by the Promise resolving. And whatever the Promise resolves *with* (the parameter) becomes the arument for the `.then`.

*It’s still confusing, can you break it down a bit?*

Absolutely!

```
new Promise((resolve, reject) => {
  console.log('Making turkey');
  resolve('turkey - done!');
}).then((result) => {
  console.log("Success! " + result);
});
```

The above code will have exactly the same output, but without the one second pause.

Here’s how the execution flows:

1. Create a new promise
2. log out `Making turkey`
3. `resolve` the promise, passing `turkey - done` as the parameter
4. `.then` is triggered, with the argument `turkey - done`
5. log out `Success! turkey - done`

But Promises are meant for asynchronous code, so you probably wouldn’t use them sequentually like this.

Let’s go back to that more complicated example

```
new Promise((resolve, reject) => {
  console.log('Making turkey');

  setTimeout(() => {
    if (true) {
      resolve('turkey - done!');
    } else {
      reject('turkey - burnt!');
    }
  }, 1000);
}).then((result) => {
  console.log("Success! " + result);
}).catch((error) => {
  console.log("Failure! " + error);
});
```

*How does the flow work for this one?*

Many of the steps are the same, but we’ll have to deal with the asyn-ness of the code this time.

1. Create a new promise
2. log out `Making turkey`
3. start a timer for one second, with a callback
4. attach the `.then` listener to the promise from step 1
5. attach the `.catch` listener to the promise from step 1
6. Wait the one second
7. Call the callback from step 3
8. `resolve` the promise, passing `turkey - done` as the parameter
9. `.then` is triggered, with the argument `turkey - done`
10. log out `Success! turkey - done`

*Why have the `.catch`? We’re not using it*

Let’s flip the conditional and see what happens!

```
new Promise((resolve, reject) => {
  console.log('Making turkey');

  setTimeout(() => {
    if (false) {
      resolve('turkey - done!');
    } else {
      reject('turkey - burnt!');
    }
  }, 1000);
}).then((result) => {
  console.log("Success! " + result);
}).catch((error) => {
  console.log("Failure! " + error);
});
```

Which gives the output:

```
Making turkey
Failure! turkey - burnt!
```

We’ll go through the steps one more time:

1. Create a new promise
2. log out `Making turkey`
3. start a timer for one second, with a callback
4. attach the `.then` listener to the promise from step 1
5. attach the `.catch` listener to the promise from step 1
6. Wait the one second
7. Call the callback from step 3
8. **different** `reject` the promise, passing `turkey - done` as the parameter
9. `.then` is triggered, with the argument `turkey - done`
10. log out `Success! turkey - done`

```
function makeTurkey() {
  return new Promise((resolve, reject) => {
    console.log('Making turkey');
    if (true) {
      console.log('turkey - done!');
      resolve();
    } else {
      console.log('turkey - burnt!')
      reject();
    }
  });
}
```

function makeTurkey() {
  return new Promise((resolve, reject) => {
    console.log('Making turkey');

    setTimeout(() => {
      if (true) {
        console.log('turkey - done!');
        resolve('resolved turkey');
      } else {
        console.log('turkey - burnt!')
        reject('rejected turkey');
      }
    }, 1000);
  });
}

function roastVeggies() {
  return new Promise((resolve, reject) => {
    console.log('Roasting veggies');
    setTimeout(() => {
      if (true) {
        console.log('veggies - done!');
        resolve('resolved veggies');
      } else {
        console.log('veggies - burnt!')
        reject('rejected veggies');
      }
    }, 1000);
  });
}

function setTable() {
  return new Promise((resolve, reject) => {
    console.log('Setting table');
    setTimeout(() => {
      if (true) {
        console.log('table - done!');
        resolve('resolved table');
      } else {
        console.log('table - messy!')
        reject('rejected table');
      }
    }, 1000);
  });
}
Promise.all([makeTurkey(), roastVeggies(), setTable()]).then(results => {
  console.log(results); // array of undefined
});
makeTurkey().then(roastVeggies).then(setTable);