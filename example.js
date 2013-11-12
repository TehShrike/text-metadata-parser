var that_big_string_from_earlier_in_the_example =
	"title:    Last will and testament\n"
	+ "date:	  2019-09-13\n"
	+ "attn:     Secret Family\n"
	+ "lovers:   3\n"
	+ "deceased: true\n"
	+ "\n"
	+ "I leave everything to Janet.\n"
	+ "\n"
	+ "Except my boots.  Those are *mine.*";

var parse = require('./');

var my_drunken_ramblings = parse(that_big_string_from_earlier_in_the_example, {
	number: ['lovers', 'bagels'],
	string: ['title', 'attn'],
	date: ['date'],
	boolean: 'deceased',
	default: { lovers: 5, bagels: 3.5}
});

console.dir(my_drunken_ramblings);
