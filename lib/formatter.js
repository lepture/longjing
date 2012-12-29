var Class = require('arale').Class;
var paint = require('colorful').paint;

/*
 * available in format:
 *
 * name
 * level
 * filepath
 * filename
 * funcName
 * lineno
 * message
 * time
 */
var defaultFormat = '[{{level}} {{filename}}:{{lineno}}] {{message}}';


var BaseFormatter = Class.create({
  initialize: function(format) {
    this._format = format || defaultFormat;
  },
  format: function(record) {
    var ret = this._format;
    Object.keys(record).forEach(function(key) {
      var regex = new RegExp('\\{\\{' + key + '\\}\\}', 'g');
      ret = ret.replace(regex, record[key]);
    });
    return ret;
  }
});
exports.BaseFormatter = BaseFormatter;


var JSONFormatter = Class.create({
  format: function(record) {
    return JSON.stringify(record);
  }
});
exports.JSONFormatter = JSONFormatter;


var ColorFormatter = BaseFormatter.extend({
  colors: {
    'debug': 'gray',
    'info': 'green',
    'warn': 'yellow',
    'error': 'red'
  },
  format: function(record) {
    var ret = ColorFormatter.superclass.format.call(this, record);
    var name = this.colors[record.level.toLowerCase()];
    return paint(ret)[name].color;
  }
});
exports.ColorFormatter = ColorFormatter;
