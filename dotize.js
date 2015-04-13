// https://github.com/vardars/dotize
var dotize = dotize || {};
dotize.convert = function(jsonobj, prefix) {
    var newobj = {};

    function recurse(o, p, isArrayItem) {
        for (var f in o) {
            if (o[f] && typeof o[f] === "object") {
                if (Array.isArray(o[f]))
                    newobj = recurse(o[f], (p ? p + "." : "") + f, true); // array
                else {
                    if (isArrayItem)
                        newobj = recurse(o[f], (p ? p : "") + "[" + f + "]"); // array item object
                    else
                        newobj = recurse(o[f], (p ? p + "." : "") + f); // object
                }
            } else {
                if (isArrayItem)
                    newobj[p + "[" + f + "]"] = o[f]; // array item primitive
                else
                    newobj[(p ? p + "." : "") + f] = o[f]; // primitive
            }
        }
        return newobj;
    }

    return recurse(jsonobj, prefix);
};
