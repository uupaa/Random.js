(function moduleExporter(name, closure) {
"use strict";

var entity = GLOBAL["WebModule"]["exports"](name, closure);

if (typeof module !== "undefined") {
    module["exports"] = entity;
}
return entity;

})("Random", function moduleClosure(global) {
"use strict";

// --- dependency modules ----------------------------------
// --- define / local variables ----------------------------
var DEFAULT_SEED = [123456789, 362436069, 521288629, 88675123];
var BUFFER_START = 4;
var BUFFER_END   = 64;

// --- class / interfaces ----------------------------------
function Random(seed,         // @arg UINT32Array = [123456789, 362436069, 521288629, 88675123] - [x, y, z, w]
                startIndex) { // @arg UINT32 = 0
//{@dev
    $valid($type(seed, "UINT32Array|omit"),  Random, "seed");
    $valid($type(startIndex, "UINT32|omit"), Random, "startIndex");
//}@dev

    seed = seed || DEFAULT_SEED;

    var seed_x = seed[0] || 0;
    var seed_y = seed[1] || 0;
    var seed_z = seed[2] || 0;
    var seed_w = seed[3] || 0;

    if ((seed_x | seed_y | seed_z | seed_w) === 0) { // all zero -> default seed
        seed_x = DEFAULT_SEED[0];
        seed_y = DEFAULT_SEED[1];
        seed_z = DEFAULT_SEED[2];
        seed_w = DEFAULT_SEED[3];
    }
    this._index  = 0;
    this._cursor = BUFFER_START; // buffer cursor

    this._buf = new Uint32Array(BUFFER_END); // buffer. 4byte * 64 = 256bytes
    this._buf[0] = seed_x;
    this._buf[1] = seed_y;
    this._buf[2] = seed_z;
    this._buf[3] = seed_w;
//  this._buf[4] = 0; // BUFFER START POINT
//         :
//  this._buf[64] = 0; // BUFFER END POINT

    _fillBuffer(this._buf, BUFFER_START, BUFFER_END);

    // discards values
    for (var i = 0, iz = startIndex || 0; i < iz; ++i) {
        this["next"]();
    }
}

Random["repository"] = "https://github.com/uupaa/Random.js";
Random["prototype"]["next"] = Random_next; // Random#next(floatValue:Boolean = false):UINT32|Number

// --- implements ------------------------------------------
function Random_next(floatValue) { // @arg Boolean = false
                                   // @ret UINT32|Number - decimal(0x00000000 - 0xffffffff) or float(0.nnnnnn) value
    var result = this._buf[this._cursor];

    ++this._index;
    if (++this._cursor >= BUFFER_END) {
        this._cursor = BUFFER_START;
        _fillBuffer(this._buf, BUFFER_START, BUFFER_END);
    }
    return floatValue ? result / 0x100000000 : result;
}

function _fillBuffer(buf, start, end) {
    for (var i = start; i < end; ++i) {
        var t = (buf[0] ^ (buf[0] << 11)) >>> 0;

        buf[0] = buf[1];
        buf[1] = buf[2];
        buf[2] = buf[3];
        buf[3] = (((buf[3] ^ ( buf[3] >>> 19 )) >>> 0) ^ ((t ^ ( t >>> 8 )) >>> 0)) >>> 0;
        buf[i] = buf[3];
    }
}

return Random; // return entity

});

