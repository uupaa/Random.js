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

var _generic = new Random();

// --- define ----------------------------------------------
// --- interface -------------------------------------------
function Random(randomSeed,   // @arg Integer = 0 - random seed. from 0 to 35
                startIndex) { // @arg Integer = 0
//{@dev
    Valid(Valid.type(randomSeed, "Integer|omit"), Random, "randomSeed");
    Valid(Valid.type(startIndex, "Integer|omit"), Random, "startIndex");
    if (randomSeed && (randomSeed < 0 || randomSeed > 36)) { throw new Error("Random(randomSeed) invalid value"); }
    if (startIndex && (startIndex < 0))                    { throw new Error("Random(startIndex) invalid value"); }
//}@dev

    randomSeed = randomSeed || 0;

    var pattern = "123456789362436069521288629088675123" +
                  "123456789362436069521288629088675123";

  //this._seed = { x: 123456789, y: 362436069, z: 521288629, w: 88675123 };
    this._seed = {
        x: parseInt(pattern.slice(randomSeed +  0, randomSeed +  9), 10),
        y: parseInt(pattern.slice(randomSeed +  9, randomSeed + 18), 10),
        z: parseInt(pattern.slice(randomSeed + 18, randomSeed + 27), 10),
        w: parseInt(pattern.slice(randomSeed + 27, randomSeed + 36), 10)
    };
    this._index = 0;
    if (startIndex) {
        for (var i = 0, iz = startIndex; i < iz; ++i) {
            this.value();
        }
    }
}

Random["repository"] = "https://github.com/uupaa/Random.js"; // GitHub repository URL. http://git.io/Help

Random["prototype"]["index"] = Random_index;
Random["prototype"]["value"] = Random_value;
Random["prototype"]["values"] = Random_values;

Random["index"] = function() { return _generic.index(); };
Random["value"] = function(decimal) { return _generic.value(decimal); };
Random["values"] = function(length, decimal) { return _generic.values(length, decimal); };

// --- implement -------------------------------------------
function Random_index() { // @ret Integer - value index.
    return this._index;
}

function Random_value(decimal) { // @arg Boolean = false - false -> devimal values. [0x00000000, 0xffffffff, ...]
                                 //                      - true  -> floating point values. [0.0, 1.0, ...]
//{@dev
    Valid(Valid.type(decimal, "Boolean|omit"), Random_value, "decimal");
//}@dev

    decimal = decimal || false;

    ++this._index;

    var t = (this._seed.x ^ (this._seed.x << 11)) >>> 0;

    this._seed.x = this._seed.y;
    this._seed.y = this._seed.z;
    this._seed.z = this._seed.w;
    this._seed.w = (((this._seed.w ^ ( this._seed.w >>> 19 )) >>> 0) ^
                    ((t ^ ( t >>> 8 )) >>> 0)) >>> 0;
    if (decimal) {
        return this._seed.w;
    }
    return this._seed.w / 0x100000000;
}

function Random_values(length,    // @arg Integer = 0 - array length.
                       decimal) { // @arg Boolean = false - false -> devimal values. [0x00000000, 0xffffffff, ...]
                                  //                      - true  -> floating point values. [0.0, 1.0, ...]
                                  // @ret Number/NumberArray - RandomNumber or [RandomNumber, ...]
//{@dev
    Valid(Valid.type(length, "Integer|omit"), Random_values, "length");
    Valid(Valid.type(decimal, "Boolean|omit"), Random_values, "decimal");
    if (length && length < 0) {
        throw new Error("Random_values(length) is invalid value");
    }
//}@dev

    length  = length  || 0;
    decimal = decimal || false;

    var result = [];

    for (var i = 0; i < length; ++i) {
        result.push( this.value(decimal) );
    }
    return result; // [Number, ...]
}

// --- export ----------------------------------------------
if ("process" in global) {
    module["exports"] = Random;
}
global["Random" in global ? "Random_" : "Random"] = Random; // switch module. http://git.io/Minify

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule

