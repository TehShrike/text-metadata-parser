var jsYaml = require('js-yaml')

var regex = /^(-{3}(?:\r?\n)([\w\W]+?)(?:\r?\n)-{3})?([\w\W]*)*/

module.exports = function jsYamlParse(text, contentName) {
	contentName = contentName || '__content';

	var results = regex.exec(text)
	var output = results[2] ? jsYaml.load(results[2]) : {}

	output[contentName] = results[3] || ''

	return output
}
