var Wizard = require('weak-type-wizard')
var yaml = require('./js-yaml-front.js')

function formatKeyValue(key, value) {
	return key + ': ' + (value.indexOf(':') >= 0 ? '"' + value + '"' : value)
}

function trimLeftWhitespace(str) {
	return str.replace(/^[\s\uFEFF\xA0]*\n/, '')
}

function makeBackwardsCompatible(text) {
	var lines = text.split('\n')
	var done_reading_metadata = false
	var done_reading_whitespace = false
	var metadataLines = []

	for (var i = 0; i < lines.length && !done_reading_whitespace; i++) {
		if (!done_reading_metadata) {
			var found_metadata = /^([^:]+):\s*([^\r\n]+)\s*$/.exec(lines[i])
			if (found_metadata && found_metadata.length === 3) {
				var key = found_metadata[1].trim()
				var value = found_metadata[2].trim()
				metadataLines.push(formatKeyValue(key, value))
			} else if (i >= 0) {
				done_reading_metadata = true
			}
		} else if (!done_reading_whitespace) {
			done_reading_whitespace = !/^\s*$/.test(lines[i])
		}
	}

	var theRestOfTheFile = lines.slice(i - 1).join('\n')

	if (metadataLines.length === 0) {
		return theRestOfTheFile
	}

	var metadata = '---\n' + metadataLines.join('\n') + '\n---\n'
	return metadata + theRestOfTheFile
}

function parseString(text) {
	if (text.indexOf('---') !== 0) {
		text = makeBackwardsCompatible(text)
	}
	var parsedYaml = yaml(text)

	var output = {
		content: trimLeftWhitespace(parsedYaml.__content)
	}
	delete parsedYaml.__content
	output.metadata = parsedYaml

	return output
}

function parse(wizard, text) {
	var post = parseString(text)
	post.metadata = wizard(post.metadata)
	return post
}

module.exports = function TextMetadataParser(text, options) {
	var wizard = new Wizard(options || {})

	return parse(wizard, text)
}
