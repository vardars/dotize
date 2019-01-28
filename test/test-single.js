var dotize = require("../src/dotize");

var result = dotize.backward({
    "[0].null": null,
    "[1].array[0]": {},
    "[1].array[1]": [],
});

console.log(JSON.stringify(result));