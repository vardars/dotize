// https://github.com/vardars/dotize
var dotize = dotize || {};
dotize.convert = function(obj, prefix) {
    if (!obj || typeof obj != "object"){
        if (prefix){
            var newObj = {};
            newObj[prefix] = obj;
            return newObj;
        }
        else
            return obj;
    }

    var newObj = {};

    function recurse(o, p, isArrayItem) {
        for (var f in o) {
            if (o[f] && typeof o[f] === "object") {
                if (Array.isArray(o[f]))
                    newObj = recurse(o[f], (p ? p : "") + (isNumber(f) ? "[" + f + "]" : "." + f), true); // array
                else {
                    if (isArrayItem)
                        newObj = recurse(o[f], (p ? p : "") + "[" + f + "]"); // array item object
                    else
                        newObj = recurse(o[f], (p ? p + "." : "") + f); // object
                }
            } else {
                if (isArrayItem || isNumber(f))
                    newObj[p + "[" + f + "]"] = o[f]; // array item primitive
                else
                    newObj[(p ? p + "." : "") + f] = o[f]; // primitive
            }
        }
        return newObj;
    }

    function isNumber(f){
        return !isNaN(parseInt(f));
    }

    return recurse(obj, prefix);
};

if (typeof module != "undefined"){
    module.exports = dotize;
}