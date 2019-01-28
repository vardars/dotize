var assert = require("assert");
var dotize = require("../src/dotize.js");

var testArray = [{
	"name": "primitive",
	"tests": [{
		"name": "number",
		"source": 1,
		"target": 1
	}, {
		"name": "string",
		"source": "foo",
		"target": "foo"
	}, {
		"name": "boolean",
		"source": true,
		"target": true
	}]
}, {
	"name": "primitive with prefix",
	"tests": [{
		"name": "number",
		"prefix": "foo",
		"source": 1,
		"target": {
			"foo": 1
		}
	}, {
		"name": "string",
		"prefix": "foo",
		"source": "foo",
		"target": {
			"foo": "foo"
		}
	}, {
		"name": "boolean",
		"prefix": "foo",
		"source": true,
		"target": {
			"foo": true
		}
	}]
}, {
	"name": "null",
	"tests": [{
		"name": "without prefix",
		"source": null,
		"target": null
	}, {
		"name": "with prefix",
		"prefix": "foo",
		"source": null,
		"target": {
			"foo": null
		}
	}]
}, {
	"name": "object",
	"tests": [{
		"name": "empty",
		"source": {},
		"target": {}
	}, {
		"name": "basic",
		"source": {
			"a": 1
		},
		"target": {
			"a": 1
		}
	}, {
		"name": "basic with empty object field",
		"source": {
			"a": {}
		},
		"target": {
			"a": {}
		}
	}, {
		"name": "basic with empty array field",
		"source": {
			"a": []
		},
		"target": {
			"a": []
		}
	}, {
		"name": "complex with child",
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
	}, {
		"name": "complex with Array",
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
	}]
}, {
	"name": "object with prefix",
	"tests": [{
		"name": "basic",
		"prefix": "foo",
		"source": {
			"a": 1
		},
		"target": {
			"foo.a": 1
		}
	}, {
		"name": "complex with child",
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
	}, {
		"name": "complex with Array",
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
	}]
}, {
	"name": "Array",
	"tests": [{
		"name": "empty",
		"source": [],
		"target": []
	}, {
		"name": "basic",
		"source": [1],
		"target": {
			"[0]": 1
		}
	}, {
		"name": "basic 2",
		"source": [1, 2],
		"target": {
			"[0]": 1,
			"[1]": 2
		}
	}, {
		"name": "with prefix",
		"prefix": "foo",
		"source": {
			"a": [1]
		},
		"target": {
			"foo.a[0]": 1
		}
	}, {
		"name": "Array of Arrays",
		"prefix": "foo",
		"source": [
			[1]
		],
		"target": {
			"foo[0][0]": 1
		}
	}]
}, {
	"name": "issues",
	"tests": [{
		"name": "#6 - weird array",
		"source": [{
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
	}, {
		"name": "#10 - Keys prefixed with dot when used with arrays",
		"source": {
			"data": [{
				"obj0key": "obj0val"
			}, {
				"obj1key": "obj1val"
			}]
		},
		"target": {
			"data[0].obj0key": "obj0val",
			"data[1].obj1key": "obj1val"
		}
	}]
}, {
	"name": "json.org examples",
	"tests": [{
		"name": "example 1",
		"source": {
			"glossary": {
				"title": "example glossary",
				"GlossDiv": {
					"title": "S",
					"GlossList": {
						"GlossEntry": {
							"ID": "SGML",
							"SortAs": "SGML",
							"GlossTerm": "Standard Generalized Markup Language",
							"Acronym": "SGML",
							"Abbrev": "ISO 8879:1986",
							"GlossDef": {
								"para": "A meta-markup language, used to create markup languages such as DocBook.",
								"GlossSeeAlso": ["GML", "XML"]
							},
							"GlossSee": "markup"
						}
					}
				}
			}
		},
		"target": {
			"glossary.GlossDiv.GlossList.GlossEntry.Abbrev": "ISO 8879:1986",
			"glossary.GlossDiv.GlossList.GlossEntry.Acronym": "SGML",
			"glossary.GlossDiv.GlossList.GlossEntry.GlossDef.GlossSeeAlso[0]": "GML",
			"glossary.GlossDiv.GlossList.GlossEntry.GlossDef.GlossSeeAlso[1]": "XML",
			"glossary.GlossDiv.GlossList.GlossEntry.GlossDef.para": "A meta-markup language, used to create markup languages such as DocBook.",
			"glossary.GlossDiv.GlossList.GlossEntry.GlossSee": "markup",
			"glossary.GlossDiv.GlossList.GlossEntry.GlossTerm": "Standard Generalized Markup Language",
			"glossary.GlossDiv.GlossList.GlossEntry.ID": "SGML",
			"glossary.GlossDiv.GlossList.GlossEntry.SortAs": "SGML",
			"glossary.GlossDiv.title": "S",
			"glossary.title": "example glossary"
		}
	}, {
		"name": "example 2",
		"source": {
			"menu": {
				"id": "file",
				"value": "File",
				"popup": {
					"menuitem": [{
						"value": "New",
						"onclick": "CreateNewDoc()"
					}, {
						"value": "Open",
						"onclick": "OpenDoc()"
					}, {
						"value": "Close",
						"onclick": "CloseDoc()"
					}]
				}
			}
		},
		"target": {
			"menu.id": "file",
			"menu.value": "File",
			"menu.popup.menuitem[0].value": "New",
			"menu.popup.menuitem[0].onclick": "CreateNewDoc()",
			"menu.popup.menuitem[1].value": "Open",
			"menu.popup.menuitem[1].onclick": "OpenDoc()",
			"menu.popup.menuitem[2].value": "Close",
			"menu.popup.menuitem[2].onclick": "CloseDoc()"
		}
	}]
},];

// convert tests
[].forEach.call(testArray, function (testGroup, idx) {
	describe("convert - " + testGroup.name, function () {
		[].forEach.call(testGroup.tests, function (testItem, idx) {
			it(testItem.name, function () {
				var result = null;

				if (testItem.prefix)
					result = dotize.convert(testItem.source, testItem.prefix);
				else
					result = dotize.convert(testItem.source);

				assert.deepEqual(result, testItem.target);
			});
		});
	});
});

// backward tests
[].forEach.call(testArray, function (testGroup, idx) {
	describe("backward - " + testGroup.name, function () {
		[].forEach.call(testGroup.tests, function (testItem, idx) {
			it(testItem.name, function () {
				var result = null;

				if (testItem.prefix)
					result = dotize.backward(testItem.target, testItem.prefix);
				else
					result = dotize.backward(testItem.target);

				assert.deepEqual(result, testItem.source);
			});
		});
	});
});