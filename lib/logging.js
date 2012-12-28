/*
 * Logging Module
 *
 * @author: Hsiaoming Yang
 *
 */

var util = require('util');
var _levels = {
  'debug': 10,
  'info': 20,
  'warn': 30,
  'error': 40
};

function Logging(name) {
  this.name = name;
  this.level = 'info';
  this.handlers = [];
}

Logging.prototype.addHandler = function(handler) {
  this.handlers.append(handler);
}

Logging.prototype.setLevel = function(level) {
  level = level.toLowerCase();
  if (_levels.hasOwnProperty(level)) {
    this.level = level;
  } else {
    // else just ignore, and set level to info
    this.level = 'info';
  }
}

Logging.prototype.debug = function() {
  log(this, 'debug', arguments);
}

Logging.prototype.info = function() {
  log(this, 'info', arguments);
}

Logging.prototype.warn = function() {
  log(this, 'warn', arguments);
}

Logging.prototype.error = function() {
  // we should always handle error
  this.handlers.forEach(function(handler) {
    handler.logger = {
      name: ctx.name,
      level: 'error'
    };
    handler.handleError(util.format.apply(this, arguments));
  });
}


// helpers
function log(ctx, level, args) {
  if (_levels[level] < _levels[ctx.level]) return;

  ctx.handlers.forEach(function(handler) {
    handler.logger = {
      name: ctx.name,
      level: level
    };
    handler.handle(util.format.apply(ctx, args));
  });
}
