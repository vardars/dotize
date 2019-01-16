var dotize = require("../src/dotize");

var result = dotize.backward({
    "[0].foo": "bar",
    "[1]": 0,
    "[2]": null,
    "[3].null": null,
    "[3].array[0]": {},
    "[3].array[1]": [],
});

console.log(JSON.stringify(result));