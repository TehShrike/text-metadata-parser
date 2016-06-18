[![Build Status](https://travis-ci.org/TehShrike/text-metadata-parser.svg)](https://travis-ci.org/TehShrike/text-metadata-parser)

Text Metadata Parser is a [Jekyll Front Matter](http://jekyllrb.com/docs/frontmatter/)-like parser.

It was created in 2013, before Jekyll was widespread enough for me to just use Front Matter instead.

At this point, text-metadata-parser uses [js-yaml](https://www.npmjs.com/package/js-yaml) internally, meaning that it supports all the YAML features that the other library supports.

In addition, for backwards compatibility, it also allows you to use a much looser syntax.  If you do not enclose the metadata section in `---` three dashes, they will be inferred.  When parsing metadata in "loose mode", key: value sections that have colons in the value string will be allowed, even if they are not enclosed in double quotes.

API
----

### parse(text, [options])

- `text` is a string that contains a metadata section at the top
- `options` is an optional object with options to create a [weak-type-wizard](https://github.com/TehShrike/weak-type-wizard) to cast the metadata to whatever types you like

Install
------

	npm install text-metadata-parser

Example
----

Say you wrote some random blog posts in a drunken stupor one night, and saved them all in text files in this format:

	title:    Last will and testament
	date:	  2019-09-13T00:00:00.000Z
	attn:     Secret Family
	lovers:   3
	deceased: true

	I leave everything to Janet.

	Except my boots.  Those are *mine.*


Parse:

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

License
------
[WTFPL](http://wtfpl2.com)
