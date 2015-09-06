var assert = require("assert");
var dotize = require("../src/dotize.js");

var testArray = [
  {
    "name": "primitive",
    "tests": [
      {
        "name": "number",
        "source": 1,
        "target": 1
      },
      {
        "name": "string",
        "source": "foo",
        "target": "foo"
      },
      {
        "name": "boolean",
        "source": true,
        "target": true
      }
    ]
  },
  {
    "name": "primitive with prefix",
    "tests": [
      {
        "name": "number",
        "prefix": "foo",
        "source": 1,
        "target": { "foo": 1 }
      },
      {
        "name": "string",
        "prefix": "foo",
        "source": "foo",
        "target": { "foo": "foo" }
      },
      {
        "name": "boolean",
        "prefix": "foo",
        "source": true,
        "target": { "foo": true }
      }
    ]
  },
  {
    "name": "null",
    "tests": [
      {
        "name" : "without prefix",
        "source": null,
        "target": null
      },
      {
        "name" : "with prefix",
        "prefix": "foo",
        "source": null,
        "target": { "foo": null }
      }
    ]
  },
  {
    "name": "object",
    "tests": [
      {
        "name" : "basic",
        "source": {
          "a": 1
        },
        "target": {
          "a": 1
        }
      },
      {
        "name" : "complex with child",
        "source": {
          "a": 1,
          "b": {
            "b2": 1
          }
        },
        "target": {
          "a": 1,
          "b.b2": 1
        }
      },
      {
        "name" : "complex with Array",
        "source": {
          "a": 1,
          "b": {
            "b2": [1]
          }
        },
        "target": {
          "a": 1,
          "b.b2[0]": 1
        }
      }
    ]
  },
  {
    "name": "object with prefix",
    "tests": [
      {
        "name" : "basic",
        "prefix": "foo",
        "source": {
          "a": 1
        },
        "target": {
          "foo.a": 1
        }
      },
      {
        "name" : "complex with child",
        "prefix": "foo",
        "source": {
          "a": 1,
          "b": {
            "b2": 1
          }
        },
        "target": {
          "foo.a": 1,
          "foo.b.b2": 1
        }
      },
      {
        "name" : "complex with Array",
        "prefix": "foo",
        "source": {
        "a": 1,
          "b": {
            "b2": [1]
          }
        },
        "target": {
          "foo.a": 1,
          "foo.b.b2[0]": 1
        }
      }
    ]
  },
  {
    "name": "Array",
    "tests": [
      {
        "name" : "empty",
        "source": [],
        "target": []
      },
      {
        "name" : "basic",
        "source": [1],
        "target": {
          "[0]": 1
        }
      },
      {
        "name" : "with prefix",
        "prefix": "foo",
        "source": {
          "a": [1]
        },
        "target": {
          "foo.a[0]": 1
        }
      },
      {
        "name" : "Array of Arrays",
        "prefix": "foo",
        "source": [[1]],
        "target": {
          "foo[0][0]": 1,
        }
      }
    ]
  },
  {
    "name": "issues",
    "tests": [
      {
        "name": "#6 - weird array",
        "source": [
          {
            "foo": "bar"
          },
          0,
          null,
          {
            "null": null,
            "array": [
              {},
              []
            ],
          }
        ],
        "target": {
          "[0].foo": "bar",
          "[1]": 0,
          "[2]": null,
          "[3].null": null,
          "[3].array[0]": {},
          "[3].array[1]": [],
        }
      }
    ]
  },
];

for (var i = 0; i < testArray.length; i++) {
  var testGroup = testArray[i];

  describe(testGroup.name, function() {
    for (var j = 0; j < testGroup.tests.length; j++) {
      var testItem = testGroup.tests[j];

      it(testItem.name, function () {
        var result = null;
        if (testItem.prefix)
          result = dotize.convert(testItem.source, testItem.prefix);
        else
          result = dotize.convert(testItem.source);
        assert.deepEqual(testItem.target, result);
      });
    };
  });
};