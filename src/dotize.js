// Convert complex js object to dot notation js object
// url: https://github.com/vardars/dotize
// author: vardars

var dotize = {
  valTypes: {
    none: 'NONE',
    primitive: 'PRIM',
    object: 'OBJECT',
    array: 'ARRAY'
  },

  getValType: function (val) {
    if ((!val || typeof val != 'object') && !Array.isArray(val)) return dotize.valTypes.primitive;
    if (Array.isArray(val)) return dotize.valTypes.array;
    if (typeof val == 'object') return dotize.valTypes.object;
  },

  getPathType: function (arrPath, randomId = null) {
    var numRegex = /^number-\w{5}-(.*)$/;
    var arrPathTypes = [];

    for (var path in arrPath) {
      var pathVal = arrPath[path];

      if (typeof currentPath === 'string' && path.startsWith(`number-${randomId}`)) {
        pathVal = path.replace(numRegex, '$1');
      }

      if (!pathVal) {
        arrPathTypes.push(dotize.valTypes.none);
      } else if (dotize.isNumber(pathVal)) {
        arrPathTypes.push(dotize.valTypes.array);
      } else {
        arrPathTypes.push(dotize.valTypes.object);
      }
    }

    return arrPathTypes;
  },

  isUndefined: function (obj) {
    return typeof obj == 'undefined';
  },

  isNumber: function (f) {
    return !isNaN(parseFloat(f)) && isFinite(f) && f.indexOf('.') === -1;
  },

  isEmptyObj: function (obj) {
    for (var prop in obj) {
      if (Object.hasOwnProperty.call(obj, prop)) return false;
    }

    return JSON.stringify(obj) === JSON.stringify({});
  },

  isNotObject: function (obj) {
    return !obj || typeof obj != 'object';
  },

  isEmptyArray: function (arr) {
    return Array.isArray(arr) && arr.length == 0;
  },

  isNotArray: function (arr) {
    return Array.isArray(arr) == false;
  },

  removeEmptyArrayItem: function (arr) {
    return arr.filter(function (el) {
      return el != null && el != '';
    });
  },

  getFieldName: function (field, prefix, isRoot, isArrayItem, isArray) {
    if (isArray)
      return (
        (prefix ? prefix : '') +
        (dotize.isNumber(field) ? '[' + field + ']' : (isRoot && !prefix ? '' : '.') + field)
      );
    else if (isArrayItem) return (prefix ? prefix : '') + '[' + field + ']';
    else return (prefix ? prefix + '.' : '') + field;
  },

  startsWith: function (val, valToSearch) {
    return val.indexOf(valToSearch) == 0;
  },

  convert: function (obj, prefix) {
    var newObj = {};

    // primitives
    if (dotize.isNotObject(obj) && dotize.isNotArray(obj)) {
      if (prefix) {
        newObj[prefix] = obj;
        return newObj;
      } else {
        return obj;
      }
    }

    return (function recurse(o, p, isRoot) {
      var isArrayItem = Array.isArray(o);
      for (var f in o) {
        var currentProp = o[f];
        if (currentProp && typeof currentProp === 'object') {
          if (Array.isArray(currentProp)) {
            if (dotize.isEmptyArray(currentProp)) {
              newObj[dotize.getFieldName(f, p, isRoot, false, true)] = currentProp;
            } else {
              newObj = recurse(
                currentProp,
                dotize.getFieldName(f, p, isRoot, false, true),
                isArrayItem
              ); // array
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
    })(obj, prefix, true);
  },

  // get a uuId of 4 chars
  getRandomId: function () {
    return Math.random().toString(36).substr(2, 4);
  },

  isIntegerString: function (input) {
    // Use the Number() function to try and convert the string to a number
    var number = Number(input);

    // Check if the value is a valid number and the input string is not equal to the stringified number
    if (!Number.isNaN(number) && input === String(number)) {
      return true;
    }

    // If we haven't returned yet, the input is not a stringified number
    return false;
  },

  backward: function (obj, prefix) {
    var newObj = {};
    var randomId = dotize.getRandomId();
    var arStartRegex = /\[(\d+)\]/g;

    // primitives
    if (dotize.isNotObject(obj) && dotize.isNotArray(obj)) {
      if (prefix) {
        return obj[prefix];
      } else {
        return obj;
      }
    }

    for (var tProp in obj) {
      var tPropVal = obj[tProp];

      if (prefix) {
        var prefixRegex = new RegExp('^' + prefix);
        tProp = tProp.replace(prefixRegex, '');
      }

      // check if there is any regex matches
      var matches = tProp.match(arStartRegex);
      tProp = tProp.replace(arStartRegex, '.$1');

      if (dotize.startsWith(tProp, '.')) tProp = tProp.replace(/^\./, '');

      var arrPath;
      if (matches || prefix || Array.isArray(arrPath) || !this.isIntegerString(tProp)) {
        arrPath = tProp.split('.');
      } else {
        arrPath = [`number-${randomId}-${tProp}`];
      }

      var arrPathTypes = dotize.getPathType(arrPath, randomId);
      // has array on root
      if (
        !dotize.isUndefined(arrPathTypes) &&
        arrPathTypes[0] == dotize.valTypes.array &&
        Array.isArray(newObj) == false
      ) {
        newObj = [];
      }

      (function recurse(rPropVal, rObj, rPropValPrev, rObjPrev, randomId = null) {
        var currentPath = arrPath.shift();
        var currentPathType = arrPathTypes.shift();
        if (typeof currentPath == 'undefined' || currentPath == '') {
          newObj = rPropVal;

          return;
        }

        var isArray = currentPathType == dotize.valTypes.array;

        if (dotize.isNumber(currentPath)) currentPath = parseInt(currentPath);
        if (typeof currentPath === 'string' && currentPath.startsWith(`number-${randomId}`)) {
          currentPath = currentPath.replace(`number-${randomId}-`, '');
        }

        // has multiple levels
        if (arrPath.length > 0) {
          // is not assigned before
          if (typeof rObj[currentPath] == 'undefined') {
            if (isArray) {
              rObj[currentPath] = [];
            } else {
              rObj[currentPath] = {};
            }
          }

          recurse(rPropVal, rObj[currentPath], currentPath, rObj);
          return;
        }

        if (currentPathType == dotize.valTypes.array && rPropValPrev && rObjPrev) {
          if (Array.isArray(rObjPrev[rPropValPrev]) == false) rObjPrev[rPropValPrev] = [];
          rObjPrev[rPropValPrev].push(rPropVal);
        } else {
          rObj[currentPath] = rPropVal;
        }
      })(tPropVal, newObj, undefined, undefined, randomId);
    }

    return newObj;
  }
};

if (typeof module != 'undefined') {
  module.exports = dotize;
}
