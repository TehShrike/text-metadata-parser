var test = require('tap').test
var Parser = require('../')

test("basic passing of the options test", function test(t) {
	var markdown_string =
		  "title    :    with wolves\n"
		+ "dances   :    2\n"
		+ "how many people does it take to tango?"

	var myParser = new Parser({
		string: ['title', 'dances']
	})

	var parsed_string = myParser(markdown_string)

	t.equal(parsed_string.metadata.dances, '2', "it is a string")
	t.notEqual(parsed_string.metadata.dances, 2, "it is not a number")

	parsed_string = myParser(markdown_string, {
		number: ['dances']
	})

	t.equal(parsed_string.metadata.dances, 2, "it is a number")
	t.notEqual(parsed_string.metadata.dances, '2', "it is not a string")

	parsed_string = myParser(markdown_string)
	t.equal(parsed_string.metadata.dances, '2', "it is a string")
	t.notEqual(parsed_string.metadata.dances, 2, "it is not a number")

	t.end()
})

test("well how about default values I guess?", function test(t) {

	var markdown_string =
		  "title    :    with wolves\n"
		+ "dances   :    2\n"
		+ "how many people does it take to tango?"

	var myParser = new Parser({
		string: ['title', 'dances'],
		number: ['bears', 'lions'],
		default: {
			bears: 5,
			value_from_the_defaults: 'hi there!'
		}
	})

	var parsed_string = myParser(markdown_string)
	t.equal(parsed_string.metadata.bears, 5, "there are five bears")

	parsed_string = myParser(markdown_string, {
		default: { bears: 3 }
	})
	t.equal(parsed_string.metadata.bears, 3, "there are three bears")

	parsed_string = myParser(markdown_string)
	t.equal(parsed_string.metadata.bears, 5, "there are five bears")

	var markdown_string =
		  "title    :    with wolves\n"
		+ "dances   :    2\n"
		+ "bears    :    9001\n"
		+ "how many people does it take to tango?"

	var parsed_string = myParser(markdown_string)
	t.equal(parsed_string.metadata.bears, 9001, "there are over 9000 bears")
	t.equal(parsed_string.metadata.value_from_the_defaults, 'hi there!', 'The value from the defaults is still there')

	parsed_string = myParser(markdown_string, {
		default: { bears: 3 }
	})
	t.equal(parsed_string.metadata.bears, 9001, "there are still over 9000 bears")
	t.equal(parsed_string.metadata.value_from_the_defaults, 'hi there!', 'The value from the defaults is still there')

	markdown_string =
		  "title    :    with wolves\n"
		+ "dances   :    2\n"
		+ "bears    :    9001\n"
		+ "lions    :    3\n"
		+ "how many people does it take to tango?"

	parsed_string = myParser(markdown_string)
	t.equal(parsed_string.metadata.bears, 9001, "yep, still over 9000 bears")
	t.equal(parsed_string.metadata.lions, 3, "3 lions (the number 3)")
	t.equal(parsed_string.metadata.value_from_the_defaults, 'hi there!', 'The value from the defaults is still there')

	t.end()
})
