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
var defaultFormatter = '[{{level}} {{filename}}:{{lineno}}] {{message}}';


var BaseFormatter = Class.create({
  initialize: function(formatter) {
    this._formatter = formatter || defaultFormatter;
  },
  format: function(record) {
    var ret = this._formatter;
    Object.keys(record).forEach(function(key) {
      var regex = new RegExp('\\{\\{' + key + '\\}\\}', 'g');
      ret = ret.replace(regex, record[key]);
    });
    return ret;
  }
});

var ColorFormatter = BaseFormatter.extend({
  format: function(record) {
  }
});
