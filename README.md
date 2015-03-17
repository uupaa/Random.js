# Random.js [![Build Status](https://travis-ci.org/uupaa/Random.js.png)](http://travis-ci.org/uupaa/Random.js)

[![npm](https://nodei.co/npm/uupaa.random.js.png?downloads=true&stars=true)](https://nodei.co/npm/uupaa.random.js/)

Random function (XORShift implement).

## Document

- [Random.js wiki](https://github.com/uupaa/Random.js/wiki/Random)
- [Development](https://github.com/uupaa/WebModule/wiki/Development)
- [WebModule](https://github.com/uupaa/WebModule)
    - [Slide](http://uupaa.github.io/Slide/slide/WebModule/index.html)
    - [Development](https://github.com/uupaa/WebModule/wiki/Development)

## How to use

### Browser and NodeWebKit

```js
<script src="lib/Random.js">
<script>
console.log( Random.value() );
</script>
```

### WebWorkers

```js
importScripts("lib/Random.js");

console.log( Random.value() );
```

### Node.js

```js
var Random = require("lib/Random.js");

console.log( Random.value() );
```

