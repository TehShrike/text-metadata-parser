var test = require('tape')
var parse = require('../')

test("first generic test", function test(t) {

	var markdown_string =
		  "---\n"
		+ "title:    Last will and testament\n"
		+ "date:     2019-09-13\n"
		+ "attn:     Secret Family\n"
		+ "lovers:   3\n"
		+ "deceased: true\n"
		+ "---\n"
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
	t.equal(parsed_string.metadata.date.getTime(), new Date('2019-09-13').getTime(), 'test date') // new Date(string) is local timezone, new Date(y,m,d) is UTC...
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
		  "---\n"
		+ "title:    my sweet title\n"
		+ "---\n"
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
		  "---\r\n"
		+ "title:    my sweet title\r\n"
		+ "---\r\n"
		+ "\r\n"
		+ "not_a_value: unreal\r\n"

	var parsed_string = parse(markdown_string, {
		string: ['title']
	})

	t.equal(parsed_string.metadata.title, 'my sweet title', 'title does not contain newline or carriage return')
	t.equal(parsed_string.content, "not_a_value: unreal\r\n", 'newline and carriage return preserved')

	t.end()
})

test("text is parsed if no empty newline after dashes", function test(t) {

	var markdown_string =
		  "---\n"
		+ "title:    my sweet title\n"
		+ "---\n"
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
		  "---\n"
		+ "    title:    my sweet title\n"
		+ "---\n"
		+ "this is some text"

	var parsed_string = parse(markdown_string, {
		string: ['title']
	})

	t.equal(parsed_string.metadata.title, 'my sweet title', 'metadata still parses')

	t.end()
})

test("whitespace after metadata key", function test(t) {

	var markdown_string =
		  "---\n"
		+ "title    :    my sweet title\n"
		+ "---\n"
		+ "this is some text"

	var parsed_string = parse(markdown_string, {
		string: ['title']
	})

	t.equal(parsed_string.metadata.title, 'my sweet title', 'metadata still parses')

	t.end()
})

test("whitespace between metadata keys", function test(t) {

	var markdown_string =
		  "---\n"
		+ "title    :    my sweet title\n"
		+ "---\n"
		+ "this is some text"

	var parsed_string = parse(markdown_string, {
		string: ['title']
	})

	t.equal(parsed_string.metadata.title, 'my sweet title', 'metadata still parses')

	t.end()
})

test("multi level metadata values for frontmatter are supported", function test(t) {

	var markdown_string =
		  "---\n"
		+ "things:\n"
		+ "  - thing one\n"
		+ "  - thing two\n"
		+ "---\n"
		+ "this is some text"

	var parsed_string = parse(markdown_string)

	t.equal(parsed_string.metadata.things[0], 'thing one', 'metadata arrays parse')
	t.equal(parsed_string.metadata.things[1], 'thing two', 'metadata arrays parse')

	t.end()
})

test("a number as a frontmatter value should be cast to a number", function test(t) {

	var markdown_string =
		  "---\n"
		+ "thing: 7\n"
		+ "---\n"
		+ "\n"
		+ "my sweet content\n\n"

	var parsed_string = parse(markdown_string)

	t.equal(typeof parsed_string.metadata.thing, 'number', 'cast to a number')

	t.end()
})

test('the weak-type-wizard casts simple things to simple types', function test(t) {

	var markdown_string =
		  "---\n"
		+ "thing: 7\n"
		+ "---\n"
		+ "\n"
		+ "my sweet content\n\n"

	var parsed_string = parse(markdown_string, {
		string: [ 'thing' ]
	})

	t.equal(typeof parsed_string.metadata.thing, 'string', 'cast to a number')

	t.end()
})

test('if no dashes around metadata it quotes value when containing semicolon', function test(t) {

	var markdown_string =
		  "title: Day One: Pants.\n"
		+ "\n"
		+ "this is some text"

	var parsed_string = parse(markdown_string)

	t.equal(parsed_string.metadata.title, 'Day One: Pants.', 'metadata still parses')

	t.end()
})

test('we do not fudge around with yaml though, you have to quote it yourself', function test(t) {

	var markdown_string =
		  "---\n"
		+ "title: Day One: Pants.\n"
		+ "---\n"
		+ "\n"
		+ "this is some text"

	t.throws(function() {
		parse(markdown_string)
	})

	t.end()
})
