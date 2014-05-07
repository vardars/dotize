// https://github.com/vardars/dotize
var dotize = dotize || {};
dotize.convert = function(jsonobj, prefix) {
    var newobj = {};
    function recurse(o, p) {
        for (var f in o) {
            if (o[f] && typeof o[f] === "object") {
                if (Array.isArray(o[f]))
                    newobj[(p ? p  + "." : "") + f] = o[f];
                else
                    newobj = recurse(o[f], (p ? p  + "." : "") + f);
            } else {
                newobj[p + "." + f] = o[f];
            }
        }
        return newobj;
    }
    return recurse(jsonobj, prefix);
};
