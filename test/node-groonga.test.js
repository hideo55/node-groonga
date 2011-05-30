
/**
 * Module dependencies.
 */

var Groonga = require('lib/node-groonga')
  , should = require('should');

module.exports = {
  'test .version': function(){
    Groonga.version.should.match(/^\d+\.\d+\.\d+$/);
  }
};

var g = new Groonga({});

g.should.exist();
