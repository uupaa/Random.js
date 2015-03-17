(function(global) {
"use strict";

// --- dependency modules ----------------------------------
// --- define / local variables ----------------------------
//var _isNodeOrNodeWebKit = !!global.global;
//var _runOnNodeWebKit =  _isNodeOrNodeWebKit &&  /native/.test(setTimeout);
//var _runOnNode       =  _isNodeOrNodeWebKit && !/native/.test(setTimeout);
//var _runOnWorker     = !_isNodeOrNodeWebKit && "WorkerLocation" in global;
//var _runOnBrowser    = !_isNodeOrNodeWebKit && "document" in global;
var X = 0;
var Y = 1;
var Z = 2;
var W = 3;
var BUFFER_START = 4;
var BUFFER_END   = 64;

// --- class / interfaces ----------------------------------
function Random(seeds,        // @arg UINT32Array = [123456789, 362436069, 521288629, 88675123] - [x, y, z, w]
                startIndex) { // @arg UINT32 = 0
//{@dev
    $valid($type(seeds, "UINT32Array|omit"), Random, "seeds");
    $valid($type(startIndex, "UINT32|omit"), Random, "startIndex");
//}@dev

    seeds = seeds || [];

    var x = seeds[0] || 123456789;
    var y = seeds[1] || 362436069;
    var z = seeds[2] || 521288629;
    var w = seeds[3] || 88675123;

    this._index = 0;
    this._cursor = BUFFER_START; // buffer cursor

    this._buf = new Uint32Array(BUFFER_END); // buffer. 4byte * 64 = 256bytes
    this._buf[X] = x || 123456789;
    this._buf[Y] = y || 362436069;
    this._buf[Z] = z || 521288629;
    this._buf[W] = w || 88675123;
//  this._buf[4] = 0; // BUFFER START POINT
//         :
//  this._buf[64] = 0; // BUFFER END POINT

    _fillValue(this._buf, BUFFER_START, BUFFER_END);

    // discards values
    for (var i = 0, iz = startIndex || 0; i < iz; ++i) {
        this["next"]();
    }
}

//{@dev
Random["repository"] = "https://github.com/uupaa/Random.js"; // GitHub repository URL. http://git.io/Help
//}@dev

Random["prototype"]["next"] = Random_next;  // Random#next(floatValue:Boolean = false):UINT32|Number

// --- implements ------------------------------------------
function Random_next(floatValue) { // @arg Boolean = false
                                   // @ret UINT32|Number - decimal(0x00000000 - 0xffffffff) or float(0.nnnnnn) value
    var result = this._buf[this._cursor];

    ++this._index;
    if (++this._cursor >= BUFFER_END) {
        this._cursor = BUFFER_START;
        _fillValue(this._buf, BUFFER_START, BUFFER_END);
    }
    return floatValue ? result / 0x100000000 : result;
}

function _fillValue(buf, start, end) {
    for (var i = start; i < end; ++i) {
        var t = (buf[X] ^ (buf[X] << 11)) >>> 0;

        buf[X] = buf[Y];
        buf[Y] = buf[Z];
        buf[Z] = buf[W];
        buf[W] = (((buf[W] ^ ( buf[W] >>> 19 )) >>> 0) ^ ((t ^ ( t >>> 8 )) >>> 0)) >>> 0;
        buf[i] = buf[W];
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

