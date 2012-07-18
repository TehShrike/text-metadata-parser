Text Metadata Parser was created for two reasons: to parse content and content metadata out of a single string, and to try to come up with the most boring library name ever.

Say you wrote some random blog posts in a drunken stupor one night, and saved them all in text files in this format:

	title:   Last will and testament
	date:	 2019-09-13
	attn:    Secret Family

	I leave everything to Janet.

	Except my boots.  Those are *mine.*

Well, it's kind of cool that you at least formatted it a bit for yourself, but now the question is - how are you going to parse this text into an easily-usable object JavaScript?

You could write your own parser, of course - or you could use this one.

In Node.js:

	var parse = require('text-metadata-parser');

In the browser:

	var parse = TEXT_METADATA_PARSER.parse;
	
