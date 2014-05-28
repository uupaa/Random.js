(function(global) {
"use strict";

// --- dependency module -----------------------------------
//{@dev
//  This code block will be removed in `$ npm run build-release`. http://git.io/Minify
var Valid = global["Valid"] || require("uupaa.valid.js"); // http://git.io/Valid
//}@dev

// --- local variable --------------------------------------
//var _runOnNode = "process" in global;
//var _runOnWorker = "WorkerLocation" in global;
//var _runOnBrowser = "document" in global;
var _seed = { x: 123456789, y: 362436069, z: 521288629, w: 88675123 };

// --- define ----------------------------------------------
// --- interface -------------------------------------------
function Random(length,             // @arg Integer = 1 - value length.
                withDecimalPoint) { // @arg Boolean = false - true  -> 0.123456 (floating value. from 0 to 1),
                                    //                        false -> 0x123456 (Uint32)
                                    // @ret NumberArray - [Number, ...]
//{@dev
    if (!/number|undefined/.test(typeof length) || length < 0) { throw new Error("Random(length) is invalid value"); }
    if (!/boolean|undefined/.test(typeof withDecimalPoint)) { throw new Error("Random(, withDecimalPoint) is invalid value"); }
//}@dev

    length = length || 1;

    var result = [];

    if (withDecimalPoint) {
        for (var i = 0; i < length; ++i) {
            result.push(_create() / 0x100000000);
        }
    } else {
        for (var i = 0; i < length; ++i) {
            result.push(_create());
        }
    }
    return result;
}

Random["repository"] = "https://github.com/uupaa/Random.js"; // GitHub repository URL. http://git.io/Help

Random["init"] = Random_init;

// --- implement -------------------------------------------
function Random_init(seed) { // @arg Integer = 0 - random seed. from 0 to 35
//{@dev
    if (!/number|undefined/.test(typeof seed)) { throw new Error("Random.init(seed)"); }
    if (seed && (seed < 0 || seed > 36)) { throw new Error("Random.init(seed) invalid value"); }
//}@dev

    seed = seed || 0;

    var pattern = "123456789362436069521288629088675123" +
                  "123456789362436069521288629088675123";

    _seed.x = parseInt(pattern.slice(seed +  0, seed +  9), 10);
    _seed.y = parseInt(pattern.slice(seed +  9, seed + 18), 10);
    _seed.z = parseInt(pattern.slice(seed + 18, seed + 27), 10);
    _seed.w = parseInt(pattern.slice(seed + 27, seed + 36), 10);
}

function _create() {
    var t = (_seed.x ^ (_seed.x << 11)) >>> 0;

    _seed.x = _seed.y;
    _seed.y = _seed.z;
    _seed.z = _seed.w;
    _seed.w = (((_seed.w ^ ( _seed.w >>> 19 )) >>> 0) ^ ((t ^ ( t >>> 8 )) >>> 0)) >>> 0;
    return _seed.w;
}

// --- export ----------------------------------------------
if ("process" in global) {
    module["exports"] = Random;
}
global["Random" in global ? "Random_" : "Random"] = Random; // switch module. http://git.io/Minify

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule

