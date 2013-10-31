var test = require('tap').test

test("this doesn't prove ANYTHING!", function lol(t) {
	t.plan(2)

	t.ok(true, "true is true")

	t.equal(1 + 1, 2, "except for very large values of 1, yeah yeah yeah")

	t.end()
})
