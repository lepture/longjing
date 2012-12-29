var expect = require('expect.js');
var require = require('./testutils');
var formatter = require('../lib/formatter');


describe('BaseFormatter', function() {
  var record = {
    name: 'root',
    level: 'INFO',
    filepath: '/tmp/a.js',
    filename: 'a.js',
    funcName: 'hello',
    lineno: 12,
    message: 'hello formatter',
    time: new Date().toISOString()
  };

  it('can format as default', function() {
    var fm = new formatter.BaseFormatter();
    expect(fm.format(record)).to.equal('[INFO a.js:12] hello formatter');
  });

  it('can customize format', function() {
    var fm = new formatter.BaseFormatter('{{name}} - {{level}} - {{message}}');
    expect(fm.format(record)).to.equal('root - INFO - hello formatter');
  });
});

describe('JSONFormatter', function() {
  var record = {
    name: 'root',
    level: 'INFO',
    message: 'hello formatter'
  }
  it('should format as JSON', function() {
    var fm = new formatter.JSONFormatter();
    expect(fm.format(record)).to.equal(
      '{"name":"root","level":"INFO","message":"hello formatter"}'
    );
  });
});

describe('ColorFormatter', function() {
  var record = {
    name: 'root',
    level: 'INFO',
    filepath: '/tmp/a.js',
    filename: 'a.js',
    funcName: 'hello',
    lineno: 12,
    message: 'hello formatter',
    time: new Date().toISOString()
  };
  it('should be colorful message', function() {
    var fm = new formatter.ColorFormatter();
    var ret = fm.format(record);
    expect(ret).to.contain('[39m');
  });
});
