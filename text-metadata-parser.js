var TextMetadataParser = (function() {
	var makeValue = {
		boolean: function(value) {
			return value.toString().toLowerCase() !== 'false'
				&& !(/^\d+$/.test(value)
				&& parseInt(value) !== 0)
		},
		number: function(value) {
			return parseFloat(value)
		},
		string: function(value) {
			return value.toString()
		},
		date: function(value) {
			return new Date(value)
		}
	}

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
				} else{
					done_reading_metadata = true
				}
			} else if (!done_reading_whitespace) {
				done_reading_whitespace = !/^\s*$/.test(lines[i])
			}
		}

		parsed_object.content = lines.slice(i - 1).join("\n")

		return parsed_object
	}

	function mapProperties(object, properties, iterator) {
		if (Array.isArray(properties)) {
			properties.forEach(function(property) {
				if (typeof object[property] !== 'undefined') {
					object[property] = iterator(object[property])
				}
			})
			return object
		} else {
			return mapProperties(object, [properties.toString()], iterator)
		}
	}

	function mapDefaults(object, defaults) {
		for (property in defaults) {
			if (typeof object[property] === 'undefined') {
				object[property] = defaults[property]
			}
		}
	}

	function parse(text, options) { //constructor function
		options = options || {}
		var parsed = parseString(text)

		mapDefaults(parsed.metadata, options.default || {})

		mapProperties(parsed.metadata, options.boolean || [], makeValue.boolean)
		mapProperties(parsed.metadata, options.number || [], makeValue.number)
		mapProperties(parsed.metadata, options.string || [], makeValue.string)
		mapProperties(parsed.metadata, options.date || [], makeValue.date)
		return parsed
	}

	return function TextMetadataParser(text, options) {
		if (typeof text !== "object") {
			return parse(text, options)
		} else {
			options = text
			return function parseWithPreviousOptions(text) {
				return parse(text, options)
			}
		}
	}
})()

if (typeof module !== 'undefined'
		&& typeof module.exports !== 'undefined') {
	module.exports = TextMetadataParser
}
