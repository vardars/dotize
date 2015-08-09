var assert = require("assert");
var dotize = require("./dotize.js");

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
	}
];

for (var i = 0; i < testArray.length; i++) {
	var testGroup = testArray[i];

	describe(testGroup.name, function() {
		for (var j = 0; j < testGroup.tests.length; j++) {
			var testItem = testGroup.tests[j];

			it(testItem.name, function () {
				if (testItem.prefix)
					assert.deepEqual(testItem.target, dotize.convert(testItem.source, testItem.prefix));
				else
					assert.deepEqual(testItem.target, dotize.convert(testItem.source));
			});
		};
	});
};