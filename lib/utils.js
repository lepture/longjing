var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

function getStack() {
  var e = new Error();
  var stack, nextStack;
  e.stack.split('\n').some(function(msg) {
    nextStack = msg.trim();
    if (msg.indexOf('<anonymous>') !== -1) return true;
    stack = msg.trim();
  });

  var funcName, abspath, lineno;
  if (/^at\s+(.*?)\s\((.*?):(\d+):\d+\)$/.exec(stack)) {
    funcName = RegExp.$1;
    abspath = RegExp.$2;
    lineno = RegExp.$3;
  }

  if (abspath.indexOf(__dirname) === 0) {
    funcName = '__main__';
    if (/\((.*?):(\d+):\d+\)$/.exec(nextStack)) {
      abspath = RegExp.$2;
      lineno = RegExp.$3;
    }
  }

  return {
    funcName: funcName,
    filepath: abspath,
    filename: path.basename(abspath),
    lineno: lineno
  };
}
exports.getStack = getStack;

function appendFile(logfile, data, encoding, callback) {
  if (!callback) {
    callback = encoding;
    encoding = 'utf8';
  }
  fs.exists(logfile, function(exists) {
    if (!exists) {
      mkdirp(path.dirname(logfile), function(err) {
        if (err) return;
        fs.appendFile(logfile, data, encoding, callback);
      });
    } else {
      fs.appendFile(logfile, data, encoding, callback);
    }
  });
}
exports.appendFile = appendFile;
