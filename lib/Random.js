(function moduleExporter(moduleName, moduleBody) { // http://git.io/WebModule
   "use strict";

    var alias  = moduleName in GLOBAL ? (moduleName + "_") : moduleName; // switch
    var entity = moduleBody(GLOBAL);

    if (typeof modules !== "undefined") {
        GLOBAL["modules"]["register"](alias, moduleBody, entity["repository"]);
    }
    if (typeof exports !== "undefined") {
        module["exports"] = entity;
    }
    GLOBAL[alias] = entity;

})("Random", function moduleBody() {

"use strict";

// --- dependency modules ----------------------------------
// --- define / local variables ----------------------------
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

Random["repository"] = "https://github.com/uupaa/Random.js"; // GitHub repository URL.
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


// --- validate and assert functions -----------------------
//{@dev
  function $type(obj, type)      { return GLOBAL["Valid"] ? GLOBAL["Valid"].type(obj, type)    : true; }
//function $keys(obj, str)       { return GLOBAL["Valid"] ? GLOBAL["Valid"].keys(obj, str)     : true; }
//function $some(val, str, ig)   { return GLOBAL["Valid"] ? GLOBAL["Valid"].some(val, str, ig) : true; }
//function $args(fn, args)       { if (GLOBAL["Valid"]) { GLOBAL["Valid"].args(fn, args); } }
  function $valid(val, fn, hint) { if (GLOBAL["Valid"]) { GLOBAL["Valid"](val, fn, hint); } }
//}@dev

return Random; // return entity

});

