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

        return JSON.stringify(obj) === JSON.stringify({});
    },

    isEmptyArray: function(arr) {
        return Array.isArray(arr) && arr.length == 0;
    },

    getFieldName: function(field, prefix, isRoot, isArrayItem, isArray) {
        if (isArray)
            return (prefix ? prefix : "") + (dotize.isNumber(field) ? "[" + field + "]" : (isRoot && !prefix ? "" : ".") + field);
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
                        if (dotize.isEmptyArray(currentProp) == false){
                            newObj = recurse(currentProp, dotize.getFieldName(f, p, isRoot, false, true), isArrayItem); // array
                        } else {
                            newObj[dotize.getFieldName(f, p, isRoot, false, true)] = currentProp;
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

    backward: function(obj, prefix) {
        var newObj = {};
        var arrayRegex = /\[([\d]+)\]/;
        var arrSeperator = "^";

        if ((!obj || typeof obj != "object") && !Array.isArray(obj)) {
            if (prefix) {
                return obj[prefix];
            } else {
                return obj;
            }
        }

        for (var tProp in obj) {
            var tPropVal = obj[tProp];
            var tPropRepl = tProp.replace(arrayRegex, "."+ arrSeperator +"$1");

            (function recurse(rPropVal, rObj, rProp, rPrefix) {
                var path = rProp.split(".");
                var currentPath = path.shift();

                if (currentPath == rPrefix)
                    currentPath = path.shift();

                if (typeof currentPath == "undefined") {
                    newObj = rPropVal;
                }

                if (path.length > 0) {
                    var joined = path.join(".");
                    rObj[currentPath] = {};
                    if (joined.indexOf(arrSeperator) == 0){
                        if (Array.isArray(rObj) == false){
                            rObj[currentPath] = [];
                        }
                    }
                    recurse(rPropVal, rObj[currentPath], joined, rPrefix);
                    return;
                }
                
                if (currentPath && currentPath.indexOf(arrSeperator) == 0){
                    rObj.push(rPropVal);
                } else {
                    rObj[currentPath] = rPropVal;
                }

                // console.log("currentPath:", currentPath, "rPropVal:", rPropVal, "rObj:", JSON.stringify(rObj));
            }(tPropVal, newObj, tPropRepl, prefix));
        }

        return newObj;
    }
}

if (typeof module != "undefined") {
    module.exports = dotize;
}