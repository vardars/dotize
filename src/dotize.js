// Convert complex js object to dot notation js object
// url: https://github.com/vardars/dotize
// author: vardars

var dotize = {
    isNumber: function(f) {
        return !isNaN(parseInt(f));
    },

    isEmptyObj: function(obj) {
        for (var prop in obj) {
            if (Object.hasOwnProperty.call(obj, prop))
                return false;
        }
    },

    getFieldName: function(field, prefix, isRoot, isArrayItem, isArray) {
        if (isArray)
            return (prefix ? prefix : "") + (dotize.isNumber(field) ? "[" + field + "]" : (isRoot ? "" : ".") + field);
        else if (isArrayItem)
            return (prefix ? prefix : "") + "[" + field + "]";
        else
            return (prefix ? prefix + "." : "") + field;
    },

    convert: function(obj, prefix) {
        var newObj = {};

        if ((!obj || typeof obj != "object") && !Array.isArray(obj)) {
            if (prefix) {
                newObj[prefix] = obj;
                return newObj;
            } else {
                return obj;
            }
        }

        return function recurse(o, p, isRoot) {
            var isArrayItem = Array.isArray(o);
            for (var f in o) {
                var currentProp = o[f];
                if (currentProp && typeof currentProp === "object") {
                    if (Array.isArray(currentProp)) {
                        newObj = recurse(currentProp, dotize.getFieldName(f, p, isRoot, false, true), isArrayItem); // array
                    } else {
                        if (isArrayItem && dotize.isEmptyObj(currentProp) == false) {
                            newObj = recurse(currentProp, dotize.getFieldName(f, p, isRoot, true)); // array item object
                        } else if (dotize.isEmptyObj(currentProp) == false) {
                            newObj = recurse(currentProp, dotize.getFieldName(f, p, isRoot)); // object
                        } else {
                            //
                        }
                    }
                } else {
                    if (isArrayItem || dotize.isNumber(f)) {
                        newObj[dotize.getFieldName(f, p, isRoot, true)] = currentProp; // array item primitive
                    } else {
                        newObj[dotize.getFieldName(f, p, isRoot)] = currentProp; // primitive
                    }
                }
            }

            return newObj;
        }(obj, prefix, true);
    },

    backward: function(obj, prefix) {
        var newObj = {};

        if ((!obj || typeof obj != "object") && !Array.isArray(obj)) {
            if (prefix) {
                return obj[prefix];
            } else {
                return obj;
            }
        }

        for (var prop in obj) {
            var currentProp = obj[prop];

            (function recurse(currentProp, o, pr, prefix) {
                var path = pr.split(".");
                var currentPath = path.shift();

                if (currentPath == prefix)
                    currentPath = path.shift();

                if (typeof currentPath == "undefined") {
                    newObj = currentProp;
                }

                if (path.length > 0) {
                    var joined = path.join(".");
                    var a = {};
                    a[currentPath] = currentProp;
                    currentProp = a;
                    //recurse(a, newObj, joined, prefix);
                }

                o[currentPath] = currentProp;
            }(currentProp, newObj, prop, prefix));
        }

        return newObj;
    }
}

if (typeof module != "undefined") {
    module.exports = dotize;
}