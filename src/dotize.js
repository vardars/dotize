// Convert complex js object to dot notation js object
// url: https://github.com/vardars/dotize
// author: vardars

var dotize = {
    valTypes: {
        primitive: 1,
        object: 2,
        array: 3,
    },

    getValType: function(val){
        if ((!val || typeof val != "object") && !Array.isArray(val))
            return dotize.valTypes.primitive;
        if (Array.isArray(val))
            return dotize.valTypes.array;
        if (typeof val == "object")
            return dotize.valTypes.object;
    },

    isNumber: function (f) {
        return !isNaN(parseInt(f));
    },

    isEmptyObj: function (obj) {
        for (var prop in obj) {
            if (Object.hasOwnProperty.call(obj, prop))
                return false;
        }

        return JSON.stringify(obj) === JSON.stringify({});
    },

    isEmptyArray: function (arr) {
        return Array.isArray(arr) && arr.length == 0;
    },

    isNotArray: function (arr) {
        return Array.isArray(arr) == false;
    },

    removeEmptyArrayItem: function (arr) {
        return arr.filter(function (el) {
            return el != null && el != "";
        });
    },

    getFieldName: function (field, prefix, isRoot, isArrayItem, isArray) {
        if (isArray)
            return (prefix ? prefix : "") + (dotize.isNumber(field) ? "[" + field + "]" : (isRoot && !prefix ? "" : ".") + field);
        else if (isArrayItem)
            return (prefix ? prefix : "") + "[" + field + "]";
        else
            return (prefix ? prefix + "." : "") + field;
    },

    startsWith: function (val, valToSearch) {
        return val.indexOf(valToSearch) == 0;
    },

    convert: function (obj, prefix) {
        var newObj = {};

        // primitives
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
                        if (dotize.isEmptyArray(currentProp)) {
                            newObj[dotize.getFieldName(f, p, isRoot, false, true)] = currentProp;
                        } else {
                            newObj = recurse(currentProp, dotize.getFieldName(f, p, isRoot, false, true), isArrayItem); // array
                        }
                    } else {
                        if (isArrayItem && dotize.isEmptyObj(currentProp) == false) {
                            newObj = recurse(currentProp, dotize.getFieldName(f, p, isRoot, true)); // array item object
                        } else if (dotize.isEmptyObj(currentProp) == false) {
                            newObj = recurse(currentProp, dotize.getFieldName(f, p, isRoot)); // object
                        } else if (dotize.isEmptyObj(currentProp)) {
                            newObj[dotize.getFieldName(f, p, isRoot, isArrayItem)] = currentProp;
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

    backward: function (obj, prefix) {
        var newObj = {};
        var arrayRegex = /\[([\d]+)\]/g;
        var arrSeperator = "^-^";

        // primitives
        if ((!obj || typeof obj != "object") && dotize.isNotArray(obj)) {
            if (prefix) {
                return obj[prefix];
            } else {
                return obj;
            }
        }

        for (var tProp in obj) {
            var tPropVal = obj[tProp];

            if (prefix) {
                var prefixRegex = new RegExp("^" + prefix);
                tProp = tProp.replace(prefixRegex, "");
            }

            var tPropRepl = tProp.replace(arrayRegex, "." + arrSeperator + "$1");

            // has Array on Root
            if (dotize.startsWith(tPropRepl, ".") && Array.isArray(newObj) == false) {
                newObj = [];
            }

            var valType = dotize.getValType(tPropVal);

            (function recurse(rPropVal, rObj, rProp, rPrefix) {
                var arrPath = rProp.split(".");
                arrPath = dotize.removeEmptyArrayItem(arrPath);
                var currentPath = arrPath.shift();

                var nextPath = arrPath.shift();
                if (typeof nextPath !== "undefined") {
                    arrPath.unshift(nextPath);
                }

                if (currentPath == rPrefix) {
                    currentPath = arrPath.shift();
                }

                if (typeof currentPath == "undefined") {
                    newObj = rPropVal;
                    return;
                }

                var isArrayItem = dotize.startsWith(currentPath, arrSeperator);
                var isArray = false;

                if (typeof nextPath !== "undefined") {
                    var isArray = dotize.startsWith(nextPath, arrSeperator);
                }

                // has multiple levels
                if (arrPath.length > 0) {
                    var joined = arrPath.join(".");
                    if (isArray) {
                        rObj[currentPath] = Array.isArray(rObj[currentPath]) ? rObj[currentPath] : [];
                    } else {
                        rObj[currentPath] = {};
                    }
                    recurse(rPropVal, rObj[currentPath], joined, rPrefix);
                    return;
                }

                if (isArrayItem) {
                    rObj.push(rPropVal);
                } else {
                    rObj[currentPath] = rPropVal;
                }
            }(tPropVal, newObj, tPropRepl, prefix));
        }

        return newObj;
    }
}

if (typeof module != "undefined") {
    module.exports = dotize;
}