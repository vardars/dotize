var dotize = require("../src/dotize");

var result = dotize.backward({
    "foo[0][0]": 1
}, "foo");

console.log(JSON.stringify(result));