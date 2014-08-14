(function(global) {
"use strict";

// --- dependency modules ----------------------------------
// --- define / local variables ----------------------------
//var _runOnNode = "process" in global;
//var _runOnWorker = "WorkerLocation" in global;
//var _runOnBrowser = "document" in global;
var _genericRandomGenerator = new Random();

// --- class / interfaces ----------------------------------
function Random(randomSeed,   // @arg Integer = 0 - random seed. from 0 to 35
                startIndex) { // @arg Integer = 0
//{@dev
    $valid($type(randomSeed, "Integer|omit"), Random, "randomSeed");
    if (randomSeed) {
        $valid(randomSeed >= 0 && randomSeed <= 35, Random, "randomSeed");
    }
    $valid($type(startIndex, "Integer|omit"), Random, "startIndex");
    if (startIndex) {
        $valid(startIndex >= 0, Random, "startIndex");
    }
//}@dev

    randomSeed = randomSeed || 0;
    startIndex = startIndex || 0;

    var SEEDS = "123456789362436069521288629088675123" +
                "123456789362436069521288629088675123";
    this._randomSeed = randomSeed;
    this._seed = {
        x: parseInt(SEEDS.slice(randomSeed +  0, randomSeed +  9), 10),
        y: parseInt(SEEDS.slice(randomSeed +  9, randomSeed + 18), 10),
        z: parseInt(SEEDS.slice(randomSeed + 18, randomSeed + 27), 10),
        w: parseInt(SEEDS.slice(randomSeed + 27, randomSeed + 36), 10)
    };

    this._index = 0;

    // discards values
    for (var i = 0, iz = startIndex; i < iz; ++i) {
        this.value();
    }
}

//{@dev
Random["repository"] = "https://github.com/uupaa/Random.js"; // GitHub repository URL. http://git.io/Help
//}@dev

Random["prototype"]["seed"]   = Random_seed;    // Random#seed():Integer
Random["prototype"]["index"]  = Random_index;   // Random#index():Integer
Random["prototype"]["value"]  = Random_value;   // Random#value(decimal:Boolean = false):Number
Random["prototype"]["values"] = Random_values;  // Random#values(length:Integer = 0, decimal:Boolean = false):NumberArray
Random["seed"]   = function() { return 0; };
Random["index"]  = function() { return _genericRandomGenerator.index(); };
Random["value"]  = function(decimal) { return _genericRandomGenerator.value(decimal); };
Random["values"] = function(length, decimal) { return _genericRandomGenerator.values(length, decimal); };

// --- implements ------------------------------------------
function Random_seed() { // @ret Integer - random seed.
    return this._randomSeed;
}

function Random_index() { // @ret Integer - value index.
    return this._index;
}

function Random_value(decimal) { // @arg Boolean = false - false -> devimal values. [0x00000000, 0xffffffff, ...]
                                 //                      - true  -> floating point values. [0.0, 1.0, ...]
                                 // @ret Number - RandomNumber
//{@dev
    $valid($type(decimal, "Boolean|omit"), Random_value, "decimal");
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
                                  // @ret NumberArray - [RandomNumber, ...]
//{@dev
    $valid($type(length, "Integer|omit"), Random_values, "length");
    if (length) {
        $valid(length >= 0, Random_values, "length");
    }
    $valid($type(decimal, "Boolean|omit"), Random_values, "decimal");
//}@dev

    length  = length  || 0;
    decimal = decimal || false;

    var result = [];

    for (var i = 0; i < length; ++i) {
        result.push( this.value(decimal) );
    }
    return result; // [Number, ...]
}

// --- validate / assertions -------------------------------
//{@dev
function $valid(val, fn, hint) { if (global["Valid"]) { global["Valid"](val, fn, hint); } }
function $type(obj, type) { return global["Valid"] ? global["Valid"].type(obj, type) : true; }
//function $keys(obj, str) { return global["Valid"] ? global["Valid"].keys(obj, str) : true; }
//function $some(val, str, ignore) { return global["Valid"] ? global["Valid"].some(val, str, ignore) : true; }
//function $args(fn, args) { if (global["Valid"]) { global["Valid"].args(fn, args); } }
//}@dev

// --- exports ---------------------------------------------
if ("process" in global) {
    module["exports"] = Random;
}
global["Random" in global ? "Random_" : "Random"] = Random; // switch module. http://git.io/Minify

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule

