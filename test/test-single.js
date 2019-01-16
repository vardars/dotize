var dotize = require("../src/dotize");

var result = dotize.backward({
    "a": 1,
    "b.b2[0]": 1
});

console.log(JSON.stringify(result));