=========
Random.js
=========

![](https://travis-ci.org/uupaa/Random.js.png)

Random function (XORShift implement).

# Document

- [Random.js wiki](https://github.com/uupaa/Random.js/wiki/Random)
- [Development](https://github.com/uupaa/WebModule/wiki/Development)
- [WebModule](https://github.com/uupaa/WebModule) ([Slide](http://uupaa.github.io/Slide/slide/WebModule/index.html))


# How to use

```js
<script src="lib/Random.js">
<script>
// for Browser
console.log( Random.value() );
</script>
```

```js
// for WebWorkers
importScripts("lib/Random.js");

console.log( Random.value() );
```

```js
// for Node.js
var Random = require("lib/Random.js");

console.log( Random.value() );
```

