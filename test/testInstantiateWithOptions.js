var test = require('tap').test
var Parser = require('../')

test("some generic test", function test(t) {

	var markdown_string =
		  "title    :    my sweet title\n"
		+ "this is some text"

	var myParser = new Parser({
		string: ['title']
	})
 
	var parsed_string = parse(markdown_string)

	t.equal(parsed_string.metadata.title, 'my sweet title', 'metadata still parses')

	t.end()
})

test("use the instantiated object more than once", function(t) {

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

	var myParser = new Parser({
		number: ['lovers', 'bagels'],
		string: ['title', 'attn'],
		date: ['date'],
		boolean: 'deceased',
		default: { lovers: 5, bagels: 3}
	})

	var result = myParser(str)

	t.equal(result.content, "I leave everything to Janet.\n\n"
		+ "Except my boots.  Those are *mine.*")

	t.equal(result.metadata.lovers, 3, "lovers should be the number 3")
	t.equal(result.metadata.title, "Last will and testament", "match title")
	t.similar(result.metadata.date, new Date("2019-09-13"), "match date")
	t.equal(result.metadata.attn, "Secret Family", "match attn string")
	t.equal(result.metadata.deceased, true, "match deceased boolean")

	var markdown_string =
		  "title    :    my sweet title\n"
		+ "this is some text"
 
	var parsed_string = myParser(markdown_string)

	t.equal(parsed_string.metadata.title, 'my sweet title', 'metadata still parses')
	t.equal(result.metadata.lovers, 5, "lovers should be the number 5")
	t.equal(result.metadata.bagels, 3, "bagels should be the number 3")

	t.end()
})
