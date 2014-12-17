'use strict';

//====================================================================

var forEach = require('lodash.foreach');
var moment = require('moment');

//====================================================================

var EOL = '\n';

function encode(val, attr) {
  var type = attr && attr.type || 'string';

  if (type === 'numeric') {
    return +val;
  }
  if (type === 'date') {
    val = moment.utc(val).format(attr.format);
  }
  return JSON.stringify(val);
}

function isDefined(val) {
  /* jshint eqnull:true */

  return val != null;
}

//====================================================================

exports.format = exports.stringify = function format(relation) {
  var arff = [];

  var name = relation.relation;
  if (isDefined(name)) {
    arff.push('@RELATION ', name, EOL, EOL);
  }

  var attributes = relation.attributes;
  forEach(attributes, function (attr) {
    arff.push('@ATTRIBUTE ', attr.name, ' ');

    var type = attr.type;
    if (type === 'date') {
      arff.push('date');

      if (attr.format) {
        arff.push(' ', encode(attr.format));
      }
    } else if (type === 'enum') {
      arff.push('{');

      forEach(attr.values, function (value) {
        arff.push(encode(value), ',');
      });

      // Replace trailing comma with closing bracket.
      arff[arff.length - 1] = '}';
    } else {
      arff.push(type);
    }

    arff.push(EOL);
  });
  arff.push(EOL);

  arff.push('@DATA', EOL);
  forEach(relation.data, function (datum) {
    forEach(attributes, function (attr) {
      var value = datum[attr.name];

      arff.push(isDefined(value) ? encode(value, attr) : '?', ',');
    });

    // Replace trailing comma with a EOL.
    arff[arff.length - 1] = EOL;
  });

  return arff.join('');
};

exports.parse = require('./parser').parse;
