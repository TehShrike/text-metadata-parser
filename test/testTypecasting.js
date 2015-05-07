var test = require('tape')
var parse = require('../')

test("basic functionality", function(t) {
	var str = "title:    Last will and testament\n"
		+ "date:	  2019-09-13\n"
		+ "attn:     Secret Family\n"
		+ "lovers:   3\n"
		+ "deceased: true\n"
		+ "\t\n"
		+ "   \n"
		+ "I leave everything to Janet.\n"
		+ "\n"
		+ "Except my boots.  Those are *mine.*";

	var result = parse(str, {
	    number: ['lovers', 'bagels'],
	    string: ['title', 'attn'],
	    date: ['date'],
	    boolean: 'deceased',
	    default: { lovers: 5, bagels: 3}
	})

	t.equal(result.content, "I leave everything to Janet.\n\n"
		+ "Except my boots.  Those are *mine.*")

	t.equal(result.metadata.lovers, 3, "lovers should be the number 3")
	t.equal(result.metadata.title, "Last will and testament", "match title")
	t.equal(result.metadata.date.getTime(), new Date("2019-09-13").getTime(), "match date")
	t.equal(result.metadata.attn, "Secret Family", "match attn string")
	t.equal(result.metadata.deceased, true, "match deceased boolean")
	t.end()
})

test("date typecasting", function(t) {
	var str = "something: Thu Oct 31 2013 01:02:06 GMT+0000 (UTC)\n"
		+ "something else: whatever\n\n\n"
		+ "is this real life?\nis this just fantasy"

	var result = parse(str, {
		date: 'something'
	})

	t.equal(result.metadata.something.getTime(), new Date(1383181326000).getTime(), "matching the date constructed from a unix timestamp")
	t.equal(result.metadata['something else'], "whatever", "string property")
	t.equal(result.content, "is this real life?\nis this just fantasy", "matching body")

	t.end()
})

test("strings and numbers", function(t) {
	var str = "number: 3\n"
		+ "string: 3\n"
		+ "also a number: three\n"
		+ "not a string: 4.3"

	var result = parse(str, {
		string: 'string',
		number: ['number', 'also a number', 'not a string']
	})

	t.equal(result.metadata.number, 3, "identical number digit")
	t.ok(isNaN(result.metadata['also a number']), "a number that is not really a number")
	t.equal(result.metadata.string, "3", "identical string digit")
	t.equal(result.metadata['not a string'], 4.3, "non-integer number")
	t.end()
})
