var ModuleTestRandom = (function(global) {

var _runOnNode = "process" in global;
var _runOnWorker = "WorkerLocation" in global;
var _runOnBrowser = "document" in global;

return new Test("Random", {
        disable:    false,
        browser:    true,
        worker:     true,
        node:       true,
        button:     true,
        both:       true,
    }).add([
        testRandom_withoutSeed,
        testRandom_init,
        testRandom_withSeed1,
        testRandom_withSeed2,
        testRandom_dump,
    ]).run().clone();


function testRandom_withoutSeed(next) {

    Random.init();

    var ary = Random(10);
    var result = [
            3701687786,
             458299110,
            2500872618,
            3633119408,
             516391518,
            2377269574,
            2599949379,
             717229868,
             137866584,
             395339113,
        ];

    var ok = true;

    for (var i = 0, iz = result.length; i < iz; ++i) {
        if ( ary[i] !== result[i]) {
            ok = false;
        }
    }
    if (ok) {
        next && next.pass();
    } else {
        next && next.miss();
    }
}

function testRandom_init(next) {

    Random.init();

    var ary = Random(10);
    var result = [
            3701687786,
             458299110,
            2500872618,
            3633119408,
             516391518,
            2377269574,
            2599949379,
             717229868,
             137866584,
             395339113,
        ];

    var ok = true;

    for (var i = 0, iz = result.length; i < iz; ++i) {
        if ( ary[i] !== result[i]) {
            ok = false;
        }
    }
    if (ok) {
        next && next.pass();
    } else {
        next && next.miss();
    }
}

function testRandom_withSeed1(next) {

    Random.init(1);

    var ary = Random(10);
    var result = [
            3761443873,
            1919982996,
            4250388539,
             479442217,
            1685665926,
            2450757024,
            3511058889,
            1358781493,
            4260225956,
            4083013420,
        ];

    var ok = true;

    for (var i = 0, iz = result.length; i < iz; ++i) {
        if ( ary[i] !== result[i]) {
            ok = false;
        }
    }
    if (ok) {
        next && next.pass();
    } else {
        next && next.miss();
    }
}

function testRandom_withSeed2(next) {

    Random.init(2);

    var ary = Random(10);
    var result = [
            4073518514,
            3577947686,
            2697817496,
             983391382,
            2942918418,
            1675046607,
            2830970496,
            2014621421,
            2640379698,
            1192958727,
        ];
    var ok = true;

    for (var i = 0, iz = result.length; i < iz; ++i) {
        if ( ary[i] !== result[i]) {
            ok = false;
        }
    }
    if (ok) {
        next && next.pass();
    } else {
        next && next.miss();
    }
}

function testRandom_dump(next) {

    Random.init(2);
    Random(3);

    var ary = Random(7);
    var result = [
//          4073518514,
//          3577947686,
//          2697817496,
             983391382,
            2942918418,
            1675046607,
            2830970496,
            2014621421,
            2640379698,
            1192958727,
        ];

    var ok = true;

    for (var i = 0, iz = result.length; i < iz; ++i) {
        if ( ary[i] !== result[i]) {
            ok = false;
        }
    }
    if (ok) {
        next && next.pass();
    } else {
        next && next.miss();
    }
}

})((this || 0).self || global);

