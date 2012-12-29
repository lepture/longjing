var path = require('path');
var expect = require('expect.js');
var require = require('./testutils');

describe('BaseHandler', function() {
  var BaseHandler = require('../lib/handler').BaseHandler;

  it('can get message without formatter', function() {
    var handler = new BaseHandler();
    expect(handler.getMessage('hello')).to.equal('hello\n');
  });

  it('can get message by formatter.format', function() {
    var formatter = {
      format: function(record) {
        return record.message;
      }
    }
    var handler = new BaseHandler(formatter);
    expect(handler.getMessage('hello')).to.equal('hello\n');
  });
});

describe('FileHandler', function() {
  var FileHandler = require('../lib/handler').FileHandler;

  it('can handle access log', function(done) {
    var handler = new FileHandler();
    handler.handle('hello', function(err) {
      if (err) throw err;
      done();
    });
  });

  it('can handle error log', function(done) {
    var handler = new FileHandler();
    handler.handleError('hello', function(err) {
      if (err) throw err;
      done();
    });
  });

  it('can set log path', function(done) {
    var handler = new FileHandler();
    handler.accessLog = path.join(__dirname, 'hello.log');
    handler.handle('hello', function(err) {
      if (err) throw err;
      done();
    });
  });
});
