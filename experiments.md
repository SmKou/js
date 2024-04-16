# Experiments

[This in Event Listening](#this-in-event-listening)
[This in Object](#this-in-object)
[Extracting This](#extracting-this)
[Use Object in Args](#use-object-in-args)
[This in Prototype](#this-in-prototype)
[Return Function in Constructor](#return-function-in-constructor)
[Return This in Constructor](#return-this-in-constructor)
[Set Canvas Order](#set-canvas-order)

## This in Event Listening
Use of this in referring an element in an attached event listener
- cannot use _this_
- use e.target

## This in Object
Use of _this_ in referring functions in objects
```js
const a = {
    val: 1,
    getVal: function() { return this.val },
    getValue() { return this.val }
}
```
- cannot use arrow functions, even if ```(val = this.val) => {}```
- cannot use nested function to get parent-sibling

## Extracting This
Extending 'this in object' by extracting value
```js
const a = (val = 1) => ({
    get() { return this._val || val },
    set(val) { this._val = val},
    extract() {
        const { _val } = this
        return _val
    }
})
const proto = a()
```
- object factory and prototype are interchangeable here

## Use Object in Args
```js
const a = ({
    rand = len => Math.floor(Math.random() * len),
    get = arr => arr[rand(arr.length)],
    arr = [2,3,4]
} = {}) => get(arr)

const proto = a()
const proto2 = a({ arr: [5, 6, 7] })
```

## This in Prototype
```js
const a = {
    val: 2,
    getValue: function() { return this.val }
}

const b = function(val) {
    this.__val = val
}
b.prototype.get = function() {
    const { __val } = this
    return __val
}
b.prototype.isEqual = function(b) {
    const { __val } = b
    return this.__val === __val
}
```
- cannot use arrow function in prototype for _this_

## Return Function in Constructor
```js
const a = function(val = 2) {
    let __val = val
    return function(fn = state => state) {
        __val = fn(__val)
        return () => ({ val: __val })
    }
}
const proto = new a()
proto().val
proto(fn).val
```
- cannot change this.__val by closure
- can change let __val

## Return This in Constructor
```js
const a = function(val = 2) {
    return function(fn = state => state) {
        if (!this.__val)
            this.__val = val
        this.__val = fn(this.__val)
        return () => ({ val: this.__val })
    }
}

const proto = new a()
proto(fn).val
proto.call(this, fn).val
```

## Set Canvas Order
- change canvas size resets canvas

## Destructuring vs Regular Params
- Slowest by mag. 1: destructure map object
- Reg. declaration: consistent .007
- Destruct params: varies by mag. 1 from .002 to .0007, func faster by mag. 1 from .0002 to .00006

Use of arrow, anon function and reg function hardly differed with reg. params and destruct map
Varies between arrow, anon and reg for destruct object
- arrow and anon on same mag.
- func faster by mag. 1

Test = avg. times across 100 rounds of 10_000 to 100_000_000 operations

**Sample**
```js
const start_arrow = performance.now()
for (let r = 0; r < round; ++r)
    destruct_arrow({ val: 1 })
results.destruct.destruct_arrow[idx] += performance.now() - start_arrow
```

**No results** on in-browser: browser crashed -> use web workers

-----------------------------------------

## Pending Experiments

### Testing in JS
```js
function test_named() {}

const test_anon = function() {}

const test_arrow = () => {}

/* Function */
[100, 1000, 10000, 100000, 1000000].forEach()

const n_e = [100, 1000, 10000, 100000, 1000000]
for (let i = 0; i < n_e.length; ++i) {}

let i = 0;
while (i < n_e.length) {}

/* Element operations */
[100, 1000, 10000, 100000, 1000000].forEach()

const n_f = [100, 1000, 10000, 100000, 1000000]
for (let i = 0; i < n_f.length; ++i) {}

let j = 0;
while (i < n_f.length) {}
```

### Get Vowel Count
```js
/*
A(t): Get vowel count
1.  function getCount(str) {
        const matches = str.match(/[aeiou]/g)
        return matches ? matches.length : 0
    }
2.  const vowelTest = []
    for (let i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); ++i) {
        vowelTest[i] = 'aeiou'.includes(String.fromCharCode(i))
        vowelTest[''.charCodeAt(0)]
    }
    function getCount(str) {
        let result = 0
        for (let i = 0; i < str.length; ++i) {
            vowelTest[str.charCodeAt(i)] ? result++ : 0
        }
        return result
    }
*/
```

### Conditionals Performance
```js
/*
A(t): If variable can have multiple values
B(t): If variables can have same value
1.  condition ? if-true : if-false
2.  if (condition)
        if-true
    else
        if-false
3.  switch (expression) {
        case (condition):
            if-true
        default:
            if-false
    }
*/
```

### Calling in Test
```js
/*
A(t): Testing functionality by not/calling functions
1.  Internal to testing
    - named function
    - anonymous function
    - arrow function
2.  External to testing
*/
```

### Asynchronous
```js
/*
A(t):
1.  Promises
2.  Async and await
3.  Callbacks
*/
```