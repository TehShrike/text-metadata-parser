var test = require('tap').test
var parse = require('../')


test("some generic test", function test(t) {

	console.log("\n1\n")

	var markdown_string =
		  "title    :    my sweet title\n"
		+ "this is some text"

	var parseTitle = parse(markdown_string,{
		string: ['title']
	})
	
	var parsed_string = parseTitle(markdown_string)
	console.log("\ntypeof parsed_string:"+typeof parsed_string+"\n")
	console.log("\nparsed_string: "+parsed_string+"\n")

	t.equal(parsed_string.metadata.title, 'my sweet title', 'metadata still parses')

	t.end()
})



test("use the instantiated object more than once", function test(t) {

	console.log("\n2\n")

	var str = "title:    Last will and testament\n"
		+ "date:	  2019-09-13\n"
		+ "attn:     Secret Family\n"
		+ "lovers:   3\n"
		+ "deceased: true\n"
		+ "\t\n"
		+ "   \n"
		+ "I leave everything to Janet.\n"
		+ "\n"
		+ "Except my boots.  Those are *mine.*";

	var myParser = parse({
		number: ['lovers', 'bagels'],
		string: ['title', 'attn'],
		date: ['date'],
		boolean: 'deceased',
		default: { lovers: 5, bagels: 3}
	})
	
	console.log("\ntypeof myParser:"+typeof myParser+"\n")
	console.log("myParser(str): "+myParser(str)+"\n")
	
	var result = myParser(str)
	
	console.log("typeof result: "+typeof result+"\n")
	
/*
	t.equal(result.content, "I leave everything to Janet.\n\n"
		+ "Except my boots.  Those are *mine.*")

	t.equal(result.metadata.lovers, 3, "lovers should be the number 3")
	t.equal(result.metadata.title, "Last will and testament", "match title")
	t.similar(result.metadata.date, new Date("2019-09-13"), "match date")
	t.equal(result.metadata.attn, "Secret Family", "match attn string")
	t.equal(result.metadata.deceased, true, "match deceased boolean")
*/

	var markdown_string =
		  "title    :    my sweet title\n"
		+ "this is some text"
 
	var parsed_string = myParser(markdown_string)

	//t.equal(parsed_string.metadata.title, 'my sweet title', 'metadata still parses')
	//t.equal(result.metadata.lovers, 5, "lovers should be the number 5")
	//t.equal(result.metadata.bagels, 3, "bagels should be the number 3")
	
	t.end()
})
