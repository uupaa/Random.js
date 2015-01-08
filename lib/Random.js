(function(global) {
"use strict";

// --- dependency modules ----------------------------------
// --- define / local variables ----------------------------
//var _isNodeOrNodeWebKit = !!global.global;
//var _runOnNodeWebKit =  _isNodeOrNodeWebKit &&  /native/.test(setTimeout);
//var _runOnNode       =  _isNodeOrNodeWebKit && !/native/.test(setTimeout);
//var _runOnWorker     = !_isNodeOrNodeWebKit && "WorkerLocation" in global;
//var _runOnBrowser    = !_isNodeOrNodeWebKit && "document" in global;
var SEEDS = "123456789362436069521288629088675123" +
            "123456789362436069521288629088675123";
var X = 0;
var Y = 1;
var Z = 2;
var W = 3;

// --- class / interfaces ----------------------------------
function Random(seed,         // @arg Integer = 0 - random seed. valid range(0x00000000 - 0xFFFFFFFF)
                startIndex) { // @arg UINT32 = 0
//{@dev
    $valid($type(seed,       "Integer|omit"), Random, "seed");
    $valid($type(startIndex, "UINT32|omit"),  Random, "startIndex");
//}@dev

    seed = seed >>> 0; // to UINT32
    var s = seed % 36;  // shift range (0 - 35)

    this._seed = seed;
    this._index = 0;
    this._cursor = 6; // buffer cursor

    this._ = new Uint32Array(256); // buffer. 4byte * 256 = 1024byte
    this._[X] = parseInt(SEEDS.slice(s +  0, s +  9), 10);
    this._[Y] = parseInt(SEEDS.slice(s +  9, s + 18), 10);
    this._[Z] = parseInt(SEEDS.slice(s + 18, s + 27), 10);
    this._[W] = parseInt(SEEDS.slice(s + 27, s + 36), 10);
//  this._[4] = 0; // RESERVED
//  this._[5] = 0; // RESERVED
//  this._[6] = 0; // BUFFER START POINT
//         :
//  this._[255] = 0; // BUFFER END POINT

    _fillValue(this._, 6, 256);

    // discards values
    for (var i = 0, iz = startIndex || 0; i < iz; ++i) {
        this.next();
    }
}

//{@dev
Random["repository"] = "https://github.com/uupaa/Random.js"; // GitHub repository URL. http://git.io/Help
//}@dev

Random["prototype"]["next"] = Random_next;  // Random#next(floatValue:Boolean = false):UINT32|Number

// --- implements ------------------------------------------
function Random_next(floatValue) { // @arg Boolean = false
                                   // @ret UINT32|Number - decimal(0x00000000 - 0xffffffff) or float(0.nnnnnn) value
    var result = this._[this._cursor];

    ++this._index;
    if (++this._cursor >= 256) {
        this._cursor = 6;
        _fillValue(this._, 6, 256);
    }
    return floatValue ? result / 0x100000000 : result;
}

function _fillValue(_, start, end) {
    for (var i = start; i < end; ++i) {
        var t = (_[X] ^ (_[X] << 11)) >>> 0;

        _[X] = _[Y];
        _[Y] = _[Z];
        _[Z] = _[W];
        _[W] = (((_[W] ^ ( _[W] >>> 19 )) >>> 0) ^ ((t ^ ( t >>> 8 )) >>> 0)) >>> 0;
        _[i] = _[W];
    }
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
if (typeof module !== "undefined") {
    module["exports"] = Random;
}
global["Random" in global ? "Random_" : "Random"] = Random; // switch module. http://git.io/Minify

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule

