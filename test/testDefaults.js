var test = require('tap').test
var parse = require('../')

test('setting default values', function(t) {
	var str =
		  'what is it: 13\n'
		+ '\n'
		+ 'Who knows!'

	var result = parse(str, {
		default: {
			'what is it': 10,
			'or this one': 20,
			'one more': 123
		},
		string: 'or this one'
	})

	t.equal(result.metadata['what is it'], 13, 'use the provided value instead of the default')
	t.equal(result.metadata['or this one'], '20', 'use the default because no value was provided')	
	t.equal(typeof result.metadata['one more'], 'number', 'should be a number')
	t.equal(result.content, 'Who knows!', 'content matches')

	t.end()
})
