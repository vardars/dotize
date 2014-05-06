var dotize = dotize || {};

dotize.convert = function(jsonobj, prefix) {
    var newobj = {};
    function recurse(o, p) {
        for (var f in o) {
            if (o[f] && typeof o[f] === "object") {
                newobj = recurse(o[f], (p ? p  + "." : "") + f);
            } else {
                newobj[p + "." + f] = o[f];
            }
        }
        return newobj;
    }
    return recurse(jsonobj, prefix);
};
