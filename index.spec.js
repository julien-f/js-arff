'use strict'

/* eslint-env jest */

// ====================================================================

var arff = require('./')

var readFile = require('fs').readFileSync

// ====================================================================

var FIXTURES = __dirname + '/fixtures' // eslint-disable-line no-path-concat

// ====================================================================

describe('arff', function () {
  it('parse()', function () {
    var expected = require(FIXTURES + '/data')
    var actual = arff.parse(readFile(FIXTURES + '/original.arff', 'utf8'))

    expect(actual).toEqual(expected)
  })

  it('format()', function () {
    var expected = readFile(FIXTURES + '/final.arff', 'utf8')
    var actual = arff.format(require(FIXTURES + '/data'))

    expect(actual).toBe(expected)
  })
})
