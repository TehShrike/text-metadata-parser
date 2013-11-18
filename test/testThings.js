var test = require('tap').test
var parse = require('../')

test("first generic test", function test(t) {

	var markdown_string =
		  "title:    Last will and testament\n"
		+ "date:     2019-09-13\n"
		+ "attn:     Secret Family\n"
		+ "lovers:   3\n"
		+ "deceased: true\n"
		+ "\n"
		+ "I leave everything to Janet.\n"
		+ "\n"
		+ "Except my boots.  Those are *mine.*"
 
	var parsed_string = parse(markdown_string, {
		number: ['lovers', 'bagels'],
		string: ['title', 'attn'],
		date: ['date'],
		boolean: 'deceased',
		default: { lovers: 5, bagels: 3.5}
	})
	
	t.equal(parsed_string.metadata.title, 'Last will and testament', 'parse title')
	t.similar(parsed_string.metadata.date, new Date('2019-09-13'), 'test date') // new Date(string) is local timezone, new Date(y,m,d) is UTC...
	t.equal(parsed_string.metadata.attn, 'Secret Family', 'attn field')
	t.equal(parsed_string.metadata.lovers, 3, 'number of lovers')
	t.equal(parsed_string.metadata.bagels, 3.5, 'default bagels')
	t.equal(parsed_string.metadata.deceased, true, 'boolean value')
	t.equal(parsed_string.content,
		  "I leave everything to Janet.\n"
		+ "\n"
		+ "Except my boots.  Those are *mine.*")

	t.end()
})

test("colon in content, newlines at content end", function test(t) {

	var markdown_string =
		  "title:    my sweet title\n"
		+ "\n\n"
		+ "not_a_value: unreal\n\n"
 
	var parsed_string = parse(markdown_string, {
		string: ['title']
	})

	t.equal(parsed_string.metadata.title, 'my sweet title', 'parse title')
	t.equal(parsed_string.content, "not_a_value: unreal\n\n", 'newlines preserved')

	t.end()
})

test("newline versus carriage return", function test(t) {

	var markdown_string =
		  "title:    my sweet title\r\n"
		+ "\r\n"
		+ "not_a_value: unreal\r\n"
 
	var parsed_string = parse(markdown_string, {
		string: ['title']
	})

	t.equal(parsed_string.metadata.title, 'my sweet title', 'title does not contain newline or carriage return')
	t.equal(parsed_string.content, "not_a_value: unreal\r\n", 'newline and carriage return preserved')

	t.end()
})

test("text is parsed if no newline after metadata", function test(t) {

	var markdown_string =
		  "title:    my sweet title\n"
		+ "this is some text"
 
	var parsed_string = parse(markdown_string, {
		string: ['title']
	})

	t.equal(parsed_string.metadata.title, 'my sweet title', 'title still parses')
	t.equal(parsed_string.content, 'this is some text', 'text is parsed')

	t.end()
})

test("whitespace before metadata key", function test(t) {

	var markdown_string =
		  "    title:    my sweet title\n"
		+ "this is some text"
 
	var parsed_string = parse(markdown_string, {
		string: ['title']
	})

	t.equal(parsed_string.metadata.title, 'my sweet title', 'metadata still parses')

	t.end()
})


test("whitespace after metadata key", function test(t) {

	var markdown_string =
		  "title    :    my sweet title\n"
		+ "this is some text"
 
	var parsed_string = parse(markdown_string, {
		string: ['title']
	})

	t.equal(parsed_string.metadata.title, 'my sweet title', 'metadata still parses')

	t.end()
})
