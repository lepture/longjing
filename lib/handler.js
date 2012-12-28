/*
 * Handler Module
 *
 * @author: Hsiaoming Yang
 *
 */

var os = require('os');
var fs = require('fs');
var mkdirp = require('mkdirp');
var Class = require('arale').Class;
var getStack = require('utils').getStack;
var appendFile = require('utils').appendFile;

var BaseHandler = Class.create({
  initialize: function(formatter) {
    this.setFormatter(formatter);
    this.logger = {
      name: 'root',
      level: 'info'
    };
  },
  setFormatter: function(formatter) {
    if (formatter) {
      this._formatter = formatter;
    } else {
      this._formatter = null;
    }
  },
  getMessage: function(msg) {
    if (!this._formatter) return msg + os.EOL;
    var logger = this.logger;
    var record = getStack();
    record.name = logger.name;
    record.level = logger.level.toUpperCase();
    record.time = new Date().toISOString();
    return this._formatter.format(record) + os.EOL;
  },
  handle: function(msg) {
  },
  handleError: function(msg) {
  }
});

var StreamHandler = BaseHandler.extend({
  handle: function(msg) {
    var message = this.getMessage(msg);
    process.stdout.write(message);
  },
  handleError: function(msg) {
    var message = this.getMessage(msg);
    process.stderr.write(message);
  },
});

var FileHandler = BaseHandler.extend({
  encoding: 'utf8',
  accessLog: 'access.log',
  errorLog: 'error.log',
  // this is 10M
  maxSize: 10,

  recycle: function(logfile, callback) {
    var self = this;
    fs.stat(logfile, function(err, stat) {
      // we are the logging, don't logging err
      if (err) return;
      if (stat > self.maxSize * 1048576) {
        var newname = logfile + '.' + new Date().getTime();
        fs.rename(logfile, newname, callback);
      }
    })
  },
  
  append: function(logfile, msg) {
    var data = this.getMessage(msg);
    appendFile(logfile, data, this.encoding, function(err) {
      if (!err) {
        this.recycle(logfile);
      }
    });
  },

  handle: function(msg) {
    this.append(this.accessLog, msg);
  },
  handleError: function(msg) {
    this.append(this.errorLog, msg);
  }
});

var EmailHandler = BaseHandler.extend({
  filter: null,

  handleError: function(msg) {
    // if has filter, we should use filter to get the message
    if (this.filter && !this.filter(msg)) return;
    var message = this.getMessage(msg);
    // TODO
  }
});