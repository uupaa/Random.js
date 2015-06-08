# Random.js [![Build Status](https://travis-ci.org/uupaa/Random.js.svg)](https://travis-ci.org/uupaa/Random.js)

[![npm](https://nodei.co/npm/uupaa.random.js.svg?downloads=true&stars=true)](https://nodei.co/npm/uupaa.random.js/)



- Random.js made of [WebModule](https://github.com/uupaa/WebModule).
- [Spec](https://github.com/uupaa/Random.js/wiki/Random)

## Browser and NW.js(node-webkit)

```js
<script src="<module-dir>/lib/WebModule.js"></script>
<script src="<module-dir>/lib/Random.js"></script>
<script>
console.log( WebModule.Random.value() );
</script>
```

## WebWorkers

```js
importScripts("<module-dir>lib/WebModule.js");
importScripts("<module-dir>lib/Random.js");

```

## Node.js

```js
require("<module-dir>lib/WebModule.js");
require("<module-dir>lib/Random.js");

```

