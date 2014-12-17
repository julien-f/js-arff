'use strict';

//====================================================================

var arff = require('./');

var readFile = require('fs').readFileSync;

//====================================================================

var FIXTURES = __dirname + '/fixtures';

//====================================================================

describe('arff', function () {

  it('parse()', function () {
    var expected = require(FIXTURES + '/data');
    var actual = arff.parse(readFile(FIXTURES + '/original.arff', 'utf8'));

    actual.must.eql(expected);
  });

  it('format()', function () {
    var expected = readFile(FIXTURES + '/final.arff', 'utf8');
    var actual = arff.format(require(FIXTURES + '/data'));

    actual.must.equal(expected);
  });

});
