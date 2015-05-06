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
		default: { lovers: 5, bagels: 3.5 }
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
	t.equal(parsed_string.content, "not_a_value: unreal", 'newlines preserved')

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
	t.equal(parsed_string.content, "not_a_value: unreal", 'newline and carriage return preserved')

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

test("unbounded yaml what does it do? it breaks things! surround with the three dashes", function test(t) {

	var markdown_string =
		  "title: sweetness\n"
		+ "more:\n"
		+ "  - thing\n"
		+ "  - other\n"
		+ "\n"
		+ "this is some text"

	var parsed_string = parse(markdown_string)

	t.equal(parsed_string.metadata.title, 'sweetness', 'first simple metadata still parses')
	t.equal(parsed_string.metadata.more, undefined, 'the simple key:value of old does not support anything complex')
	t.equal(parsed_string.content, '- thing\n  - other\n\nthis is some text', 'the first line without : is the content')

	t.end()
})

test('another example of unbounded yaml with no values', function test(t) {

	var markdown_string =
		  "title: sweetness\n"
		+ "more:\n"
		+ "this is some text"

	var parsed_string = parse(markdown_string)

	t.equal(parsed_string.metadata.title, 'sweetness', 'metadata still parses')
	t.equal(parsed_string.metadata.more, undefined, 'metadata still parses')
	t.equal(parsed_string.content, 'this is some text')

	t.end()
})
