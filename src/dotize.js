// Convert complex js object to dot notation js object
// url: https://github.com/vardars/dotize
// author: vardars

var dotize = dotize || {};

dotize.convert = function(obj, prefix) {
    var newObj = {};

    if ((!obj || typeof obj != "object") && !Array.isArray(obj)) {
        if (prefix) {
            newObj[prefix] = obj;
            return newObj;
        } else {
            return obj;
        }
    }

    function isNumber(f) {
        return !isNaN(parseInt(f));
    }

    function isEmptyObj(obj) {
        for (var prop in obj) {
            if (Object.hasOwnProperty.call(obj, prop))
                return false;
        }

        return true;
    }

    function isEmptyArray(o) {
        if (Array.isArray(o) && o.length === 0)
            return true;
        return false;
    }

    function getFieldName(field, prefix, isRoot, isArrayItem, isArray) {
        if (isArray)
            return (prefix ? prefix : "") + (isNumber(field) ? "[" + field + "]" : (isRoot ? "" : ".") + field);
        else if (isArrayItem)
            return (prefix ? prefix : "") + "[" + field + "]";
        else
            return (prefix ? prefix + "." : "") + field;
    }

    return function recurse(o, p, isRoot) {
        var isArrayItem = Array.isArray(o);
        for (var f in o) {
            if (o.hasOwnProperty(f)) {
                var currentProp = o[f];
                if (currentProp && typeof currentProp === "object") {
                    if (Array.isArray(currentProp)) {
                        if (isEmptyArray(currentProp)) {
                            newObj[getFieldName(f, p, isRoot, true)] = currentProp; // empty array
                        } else {
                            newObj = recurse(currentProp, getFieldName(f, p, isRoot, false, true), isArrayItem); // array
                        }
                    } else {
                        if (isArrayItem) {
                            if (isEmptyObj(currentProp)) {
                                newObj[getFieldName(f, p, isRoot, true)] = currentProp; // empty object
                            } else {
                                newObj = recurse(currentProp, getFieldName(f, p, isRoot, true)); // array item object
                            }
                        } else {
                            if (isEmptyObj(currentProp)) {
                                newObj[getFieldName(f, p, isRoot)] = currentProp; // empty object
                            } else {
                                newObj = recurse(currentProp, getFieldName(f, p, isRoot)); // object
                            }
                        }
                    }
                } else {
                    if (isArrayItem || isNumber(f)) {
                        newObj[getFieldName(f, p, isRoot, true)] = currentProp; // array item primitive
                    } else {
                        newObj[getFieldName(f, p, isRoot)] = currentProp; // primitive
                    }
                }
            }
        }

        if (isEmptyObj(newObj))
            return obj;

        return newObj;
    }(obj, prefix, true);
};

if (typeof module != "undefined") {
    module.exports = dotize;
}