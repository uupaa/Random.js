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
        testRandom_zero,
        testRandom_withoutSeed,
        testRandom_init,
        testRandom_withSeed1,
        testRandom_withSeed2,
        testRandom_dump,
        testRandom_reproducibility,
    ]).run().clone();


function testRandom_zero(test, pass, miss) {

    var random = new Random();
    var value = random.value();
    var result = [
            3701687786,
        ];

    var ok = true;

    for (var i = 0, iz = result.length; i < iz; ++i) {
        if ( value !== result[i] / 0x100000000) {
            ok = false;
        }
    }
    if (ok) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testRandom_withoutSeed(test, pass, miss) {

    var random = new Random();
    var ary = random.values(10);
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
        if ( ary[i] !== result[i] / 0x100000000) {
            ok = false;
        }
    }
    if (ok) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testRandom_init(test, pass, miss) {

    var random = new Random();
    var ary = random.values(10);
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
        if ( ary[i] !== result[i] / 0x100000000) {
            ok = false;
        }
    }
    if (ok) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testRandom_withSeed1(test, pass, miss) {

    var random = new Random(1);
    var ary = random.values(10);
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
        if ( ary[i] !== result[i] / 0x100000000) {
            ok = false;
        }
    }
    if (ok) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testRandom_withSeed2(test, pass, miss) {

    var random = new Random(2);
    var ary = random.values(10);
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
        if ( ary[i] !== result[i] / 0x100000000) {
            ok = false;
        }
    }
    if (ok) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testRandom_dump(test, pass, miss) {

    var random = new Random(2, 3);
    var ary = random.values(7);
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
        if ( ary[i] !== result[i] / 0x100000000) {
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

    // --------------------
    var random1 = new Random(seed);
        random1.values(1000);

    var value1 = random1.value(); // 1001 value
    var index1 = random1.index(); // 1001
    var seed1  = random1.seed();

    // --------------------
    var random2 = new Random(seed1, index1 - 1);
    var value2 = random2.value(); // 1001 value
    var index2 = random2.index(); // 1001
    var seed2  = random2.seed();


    if (seed1  === seed2  &&
        index1 === index2 &&
        value1 === value2) {

        test.done(pass());
    } else {
        test.done(miss());
    }
}

})((this || 0).self || global);

