var ModuleTestRandom = (function(global) {

var _isNodeOrNodeWebKit = !!global.global;
var _runOnNodeWebKit =  _isNodeOrNodeWebKit &&  /native/.test(setTimeout);
var _runOnNode       =  _isNodeOrNodeWebKit && !/native/.test(setTimeout);
var _runOnWorker     = !_isNodeOrNodeWebKit && "WorkerLocation" in global;
var _runOnBrowser    = !_isNodeOrNodeWebKit && "document" in global;

return new Test("Random", {
        disable:    false,
        browser:    true,
        worker:     true,
        node:       true,
        nw:         true,
        button:     true,
        both:       true,
    }).add([
        testRandom_noSeed,
        testRandom_seed0,
        testRandom_seed1,
        testRandom_seed2,
        testRandom_seed36,
        testRandom_startIndex,
        testRandom_reproducibility,
        testRandom_dump1000,
    ]).run().clone();


function testRandom_noSeed(test, pass, miss) {

    var random = new Random();
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
        var r = random.next();
        if (r !== result[i]) {
            ok = false;
        }
    }
    if (ok) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testRandom_seed0(test, pass, miss) {

    var random = new Random();
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
        var r = random.next();
        if (r !== result[i]) {
            ok = false;
        }
    }
    if (ok) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}


function testRandom_seed1(test, pass, miss) {

  //var random = new Random(1);
    var random = new Random([ 234567893,
                              624360695,
                              212886290,
                              886751231 ]);
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
        var r = random.next();
        if (r !== result[i]) {
            ok = false;
        }
    }
    if (ok) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testRandom_seed2(test, pass, miss) {

  //var random = new Random(2);
    var random = new Random([
                              345678936,
                              243606952,
                              128862908,
                              867512312 ]);
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
        var r = random.next();
        if (r !== result[i]) {
            ok = false;
        }
    }
    if (ok) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testRandom_seed36(test, pass, miss) {

  //var random = new Random(36);
    var random = new Random([
                              123456789,
                              362436069,
                              521288629,
                              088675123 ]);
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
        var r = random.next();
        if (r !== result[i]) {
            ok = false;
        }
    }
    if (ok) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testRandom_startIndex(test, pass, miss) {

  //var random = new Random(2, 3);
    var random = new Random([
                              345678936,
                              243606952,
                              128862908,
                              867512312 ], 3);
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
        var r = random.next();
        if (r !== result[i]) {
            ok = false;
        }
    }
    if (ok) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testRandom_reproducibility(test, pass, miss) {
    var seed = 2;

  //var random1 = new Random(seed, 1000);
  //var random2 = new Random(seed, 1000);

    var random1 = new Random([
                              345678936,
                              243606952,
                              128862908,
                              867512312 ]);
    var random2 = new Random([
                              345678936,
                              243606952,
                              128862908,
                              867512312 ]);

    if (random1.next() === random2.next()) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testRandom_dump1000(test, pass, miss) {
    var random = new Random();

    for (i = 0; i < 1000; ++i) {
        var r = random.next();
        console.log(i, r, r / 0x100000000);
    }
    test.done(pass());
}

})((this || 0).self || global);

