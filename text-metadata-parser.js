var Wizard = require('weak-type-wizard')

function parseString(text) {
	var lines = text.split("\n")
	var done_reading_metadata = false
	var done_reading_whitespace = false
	var parsed_object = { content: "", metadata: {} }

	for (var i = 0; i < lines.length && !done_reading_whitespace; i++) {
		if (!done_reading_metadata) {
			var found_metadata = /^([^:]+):\s*([^\r\n]+)\s*$/.exec(lines[i])
			if (found_metadata && found_metadata.length === 3) {
				var property = found_metadata[1].trim()
				parsed_object.metadata[property] = found_metadata[2]
			} else if (i === 0) {
				return { content: text, metadata: {} }
			} else {
				done_reading_metadata = true
			}
		} else if (!done_reading_whitespace) {
			done_reading_whitespace = !/^\s*$/.test(lines[i])
		}
	}

	parsed_object.content = lines.slice(i - 1).join("\n")

	return parsed_object
}


function parse(wizard, text) {
	var post = parseString(text)
	post.metadata = wizard(post.metadata)
	return post
}

function TextMetadataParser(wizard, text, options) {
	var calledAsAConstructorFunction = typeof text !== 'string'

	if (typeof options === 'undefined' && typeof text !== 'string') {
		options = text
	}

	var currentWizard = typeof options === 'object' ? wizard.extend(options) : wizard

	if (calledAsAConstructorFunction) {
		return TextMetadataParser.bind(null, currentWizard)
	} else {
		return parse(currentWizard, text)
	}
}

module.exports = TextMetadataParser.bind(null, new Wizard({}))
