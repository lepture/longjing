# Longjing

------------

Longjing(龍井) is a famous tea in Hangzhou, China.

However, this one is the killer logging system for node.

[![Build Status](https://travis-ci.org/lepture/longjing.png?branch=master)](https://travis-ci.org/lepture/longjing)


## Installation

Installation could be easy with npm:

```
npm install longjing
```

But you won't need this, just bind it in your `package.json` dependencies.


## Overview

The basic usage of **longjing**:

```javascript
var longjing = require('longjing');
longjing.info('info message')
longjing.warn('warn message')
longjing.error('error message')

// to show debug message, you should set level to debug
// the default level is info
longjing.setLevel('debug')
longjing.debug('debug message')
```

Get a logger of **longjing**:

```javascript
var longjing = require('longjing');
var logger = longjing.getLogger('name');
logger.info('info message')
```

## Design

Longjing is a full stack logging system, it's not a toy.

If you are just writing a simple command line tool, it's not for you. Instead, you should have a look at [colorful](http://lab.lepture.com/colorful/) nested logging.

The design of longjing contains three parts, which are `Logging`, `Handler`, and `Formatter`.

### Logging

Logging is the interface, it needs handler to do the real thing.


### Handler


### Formatter

