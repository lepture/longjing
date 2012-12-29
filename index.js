exports.Logging = require('./lib/logging').Logging;

var handlers = require('./lib/handler');
Object.keys(handlers).forEach(function(key) {
  exports[key] = handlers[key];
});
var formatters = require('./lib/formatter');
Object.keys(formatters).forEach(function(key) {
  exports[key] = formatters[key];
});

var _loggers = {};

function getLogger(name) {
  if (_loggers.hasOwnProperty(name)) {
    return _loggers[name];
  }
  var logger = new exports.Logging(name);
  _loggers[name] = logger;
  return logger;
}
exports.getLogger = getLogger;
