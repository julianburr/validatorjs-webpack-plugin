var IgnorePlugin = require('webpack').IgnorePlugin;
var Validator = require('validatorjs');

function checkOptions (options) {
  var localesToKeep = options.localesToKeep || [];

  if (!Array.isArray(localesToKeep)) {
    throw new Error(
      'ValidatorjsPlugin: Expected the `localesToKeep` option to be an array, received ' +
        (JSON.stringify(localesToKeep) || localesToKeep) +
        '. Pass an array, like this:\nmodule.exports = {\n  plugins: [\n    new ValidatorjsPlugin({\n' +
        "      localesToKeep: ['en']\n    })\n  ]\n}"
    );
  }

  // Check if it has unknown locales
  var absentLocales = localesToKeep.filter(function (localeName) {
    var exists;
    try {
      Validator.useLang('ru');
      exists = true;
    } catch (e) {
      exists = false;
    }
    return !exists;
  });

  if (absentLocales.length > 0) {
    throw new Error(
      'ValidatorjsPlugin: validatorjs doesn’t seem to include ' +
        (absentLocales.length === 1
          ? 'a locale you specified: '
          : 'a few locales you specified: ') +
        absentLocales.join(', ')
    );
  }

  return {
    localesToKeep: localesToKeep
  };
}

function ValidatorjsPlugin (options) {
  var normalizedOptions = checkOptions(options);
  var localesToKeep = normalizedOptions.localesToKeep;

  const exp = new RegExp('^./(?!' + localesToKeep.join('|') + ')(.+)$');
  return new IgnorePlugin(exp, /validatorjs\/src\/lang/);
}

module.exports = ValidatorjsPlugin;
