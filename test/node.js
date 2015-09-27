// Random test

require("../lib/WebModule.js");

// publish to global
WebModule.publish = true;


require("./wmtools.js");
require("../lib/Random.js");
require("../release/Random.n.min.js");
require("./testcase.js");

