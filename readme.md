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

In Node.js:

	var parse = require('text-metadata-parser');

In the browser:

	var parse = TEXT_METADATA_PARSER.parse;
	
Parse it the way you want:

	var my_drunken_ramblings = parse(a_variable_containing_that_big_string, {
		number: ['lovers', 'bagels'],
		string: ['title', 'attn'],
		date: ['date'],
		boolean: 'deceased',
		default: { lovers: 5, bagels: 3}
	});
	
3: PROFIT!!!11

	> console.log(my_drunken_ramblings.metadata.title);
	Last will and testament
	
	> console.log(my_drunken_ramblings.metadata.date);
	Fri Sep 13 2019 00:00:00 GMT+0000 (Coordinated Universal Time)
	
	> console.log(my_drunken_ramblings.metadata.lovers);
	3
	
	> console.log(my_drunken_ramblings.metadata.bagels);
	3
	
	> console.log(my_drunken_ramblings.content);
	I leave everything to Janet.
	
	Except my boots.  Those are *mine.*