var jsYaml = require('js-yaml')

module.exports = function jsYamlParse(text, name) {
  name = name || '__content';
  var re = /^(-{3}(?:\n|\r)([\w\W]+?)(?:\n|\r)-{3})?([\w\W]*)*/
    , results = re.exec(text)
    , conf = {}
    , yamlOrJson;

  if((yamlOrJson = results[2])) {
    if(yamlOrJson.charAt(0) === '{') {
      conf = JSON.parse(yamlOrJson);
    } else {
      conf = jsYaml.load(yamlOrJson);
    }
  }

  conf[name] = results[3] ? results[3] : '';

  return conf;
};
