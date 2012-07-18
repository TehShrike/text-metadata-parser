var a_variable_containing_that_big_string = "title:    Last will and testament\n"
	+ "date:	  2019-09-13\n"
	+ "attn:     Secret Family\n"
	+ "lovers:   3\n"
	+ "deceased: true\n"
	+ "\n"
	+ "I leave everything to Janet.\n"
	+ "\n"
	+ "Except my boots.  Those are *mine.*";

var parse = require('./');

var my_drunken_ramblings = parse(a_variable_containing_that_big_string, {
	number: ['lovers', 'bagels'],
	string: ['title', 'attn'],
	date: ['date'],
	boolean: 'deceased',
	default: { lovers: 5, bagels: 3}
});

console.log(my_drunken_ramblings.metadata.title);
console.log(my_drunken_ramblings.metadata.date);
console.log(my_drunken_ramblings.metadata.lovers);
console.log(my_drunken_ramblings.metadata.bagels);
console.log(my_drunken_ramblings.content);