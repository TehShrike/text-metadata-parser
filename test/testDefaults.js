var test = require('tap').test
var parse = require('../')

test("defaults", function(t) {
	var str = "what is it: 13\n\n"
		+ "Who knows!"

	var result = parse(str, {
		default: {
			"what is it": 10,
			"or this one": 20
		},
		string: "or this one"
	})

	test("using the provided value instead of the default", function(t) {
		t.equal(result.metadata['what is it'], "13")
		t.end()
	})

	test("using the default because no value was provided", function(t) {
		t.equal(result.metadata['or this one'], "20")
		t.end()
	})
	
	t.equal(result.content, "Who knows!", "matching body")

	t.end()
})
