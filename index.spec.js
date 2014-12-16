'use strict';

//====================================================================

var arff = require('./');

var readFile = require('fs').readFileSync;

//====================================================================

describe('arff', function () {

  describe('parse()', function () {
    it('', function () {
      var expected = require('./example');
      var actual = arff.parse(readFile(__dirname + '/example.arff', 'utf8'));

      actual.must.eql(expected);
    });
  });

});
