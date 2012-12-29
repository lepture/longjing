var color = require('colorful').color;
color.isatty = true;
module.exports = function(file) {
  if (process.env.COVERAGE) {
    file = file.replace('/lib/', '/lib-cov/');
  }
  return require(file);
};
