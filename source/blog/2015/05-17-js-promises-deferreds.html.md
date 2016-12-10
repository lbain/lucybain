---
title: 'JS: Getting to know promises'
tags: js, interview-questions
published: false
---

## How can I use promises?

need two actions to happen in order

```
function blah() {
  console.log(1)
  console.log(2);
}

blah();
```

Let’s assume these two actions happen asynchronously. Perhaps they’re AJAX calls, but exactly what they are doesn’t matter. To similate this, I’ve made a function that randomly waits less than a second (so the examples run quickly!). I’ll assume this function is available throughout.

```
function async(main) {
  setTimeout(function() {
    main();
  }, Math.random() * 1000);
}
```

```
function log1() {
  console.log(1);
}

function log2() {
  console.log(2);
}
```

```
function blah() {
  async(log1);

  async(log2);
}

blah();
```

Sometimes 1 will be logged first, but sometimes 2. Not good enough.

Normal ajax has success and error callbacks. I’ve left this out.

```
function promiseObj(main) {
  return new Promise(function(main){
    async(main)
  });
}
```


```
function blah() {
  promiseObj(log1).then(function() {
    async(log2);
  });
}

blah();
```

## References

