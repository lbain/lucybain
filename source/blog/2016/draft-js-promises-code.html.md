---
title:
tags:
published: false

description:
keywords:
---

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