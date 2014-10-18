[![Build Status](https://travis-ci.org/TehShrike/text-metadata-parser.svg)](https://travis-ci.org/TehShrike/text-metadata-parser)

Text Metadata Parser was created for two reasons: to parse content and content metadata out of a single string, and to try to come up with the most boring library name ever.

Say you wrote some random blog posts in a drunken stupor one night, and saved them all in text files in this format:

	title:    Last will and testament
	date:	  2019-09-13
	attn:     Secret Family
	lovers:   3
	deceased: true

	I leave everything to Janet.

	Except my boots.  Those are *mine.*

Well, it's kind of cool that you at least formatted it a bit for yourself, but now the question is - how are you going to parse this text into an easily-usable JavaScript object?

You could write your own parser, of course - or you could use this one.

In Node.js
------

Install:

	npm install text-metadata-parser

Parse them strings
------

	var my_drunken_ramblings = parse(that_big_string_from_earlier_in_the_example, {
		number: ['lovers', 'bagels'],
		string: ['title', 'attn'],
		date: ['date'],
		boolean: 'deceased',
		default: { lovers: 5, bagels: 3}
	});

PROFIT!!!11

	> my_drunken_ramblings.metadata.title
	'Last will and testament'

	> my_drunken_ramblings.metadata.date
	Fri Sep 13 2019 00:00:00 GMT+0000 (Coordinated Universal Time)

	> my_drunken_ramblings.metadata.lovers
	3

	> my_drunken_ramblings.metadata.bagels
	3

	> my_drunken_ramblings.content
	'I leave everything to Janet.\n\nExcept my boots.  Those are *mine.*'

Todo
------
- Add examples passing in custom values overwriting previous ones

License
------
[WTFPL](http://wtfpl2.com)
