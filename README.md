# Random.js [![Build Status](https://travis-ci.org/uupaa/Random.js.svg)](https://travis-ci.org/uupaa/Random.js)

[![npm](https://nodei.co/npm/uupaa.random.js.svg?downloads=true&stars=true)](https://nodei.co/npm/uupaa.random.js/)



- Please refer to [Spec](https://github.com/uupaa/Random.js/wiki/) and [API Spec](https://github.com/uupaa/Random.js/wiki/Random) links.
- The Random.js is made of [WebModule](https://github.com/uupaa/WebModule).

## Browser and NW.js(node-webkit)

```js
<script src="<module-dir>/lib/WebModule.js"></script>
<script src="<module-dir>/lib/Random.js"></script>
<script>
var random = new Random();

random.next() // -> 0x000000000 - 0xffffffff
random.next() // -> 0x000000000 - 0xffffffff
random.next() // -> 0x000000000 - 0xffffffff

</script>
```

## WebWorkers

```js
importScripts("<module-dir>lib/WebModule.js");
importScripts("<module-dir>lib/Random.js");

...
```

## Node.js

```js
require("<module-dir>lib/WebModule.js");
require("<module-dir>lib/Random.js");

...
```

