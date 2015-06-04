var ModuleTestRandom = (function(global) {

global["BENCHMARK"] = false;

var test = new Test("Random", {
        disable:    false, // disable all tests.
        browser:    true,  // enable browser test.
        worker:     true,  // enable worker test.
        node:       true,  // enable node test.
        nw:         true,  // enable nw.js test.
        button:     true,  // show button.
        both:       true,  // test the primary and secondary modules.
        ignoreError:false, // ignore error.
        callback:   function() {
        },
        errorback:  function(error) {
        }
    }).add([
        testRandom_noSeed,
        testRandom_seed0,
        testRandom_seed36,
        testRandom_startIndex,
        testRandom_reproducibility,
        testRandom_dump1000,
    ]);

if (IN_BROWSER || IN_NW) {
    test.add([
        // browser and node-webkit test
    ]);
} else if (IN_WORKER) {
    test.add([
        // worker test
    ]);
} else if (IN_NODE) {
    test.add([
        // node.js and io.js test
    ]);
}

// --- test cases ------------------------------------------
function testRandom_noSeed(test, pass, miss) {

    var random = new WebModule.Random();
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

    var random = new WebModule.Random();
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

function testRandom_seed36(test, pass, miss) {

  //var random = new WebModule.Random(36);
    var random = new WebModule.Random([
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

  //var random = new WebModule.Random(2, 3);
    var random = new WebModule.Random([
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

  //var random1 = new WebModule.Random(seed, 1000);
  //var random2 = new WebModule.Random(seed, 1000);

    var random1 = new WebModule.Random([
                              345678936,
                              243606952,
                              128862908,
                              867512312 ]);
    var random2 = new WebModule.Random([
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
    var random = new WebModule.Random();

    for (i = 0; i < 1000; ++i) {
        var r = random.next();
        console.log(i, r, r / 0x100000000);
    }
    test.done(pass());
}

return test.run();

})(GLOBAL);

