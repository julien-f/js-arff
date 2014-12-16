// ARFF parser
//
// Sparse ARFF files are not supported!
//
// Source: http://www.cs.waikato.ac.nz/ml/weka/arff.html

{
	// Declarations
}

start =
	separator?
	relation:relation?
	separator
	attributes:attributes
	separator
	data:data
	separator? {
		return {
			relation: relation,
			attributes: attributes,
			data: data
		};
	}

//====================================================================
// Comment

separator = (nl / comment nl)+

comment = '%' (!nl .)*

//====================================================================
// Relation

relation = '@relation'i ws+ name:string {
	return name;
}

//====================================================================
// Attribute

attributes =
	first:attribute
	rest:(separator attribute:attribute { return attribute; })* {
		rest.unshift(first);
		return rest;
	}

attribute = '@attribute'i ws+ name:string ws+ type:type {
	return type.length ? {
		name: name,
		type: 'enum',
		values: type
	} : {
		name: name,
		type: type
	};
}

type
	= 'date'i { return 'date'; }
	/ class
	/ 'numeric'i { return 'numeric'; }
	/ 'string'i { return 'string'; }

class 'class' = '{' first:string rest:(',' value:string { return value; })* '}' {
	rest.unshift(first);
	return rest;
}

//====================================================================
// Data

data = '@data'i values:(nl datum:datum { return datum; })* {
	return values;
}

datum = first:value rest:(',' value:value { return value; })* {
	rest.unshift(first);
	return rest;
}

value = unknown / string

unknown = '?'

//====================================================================
// String
// See https://github.com/pegjs/pegjs/blob/fba70833dd93d61cc1574b855a67ff6af71dfe40/examples/json.pegjs#L101

string 'string'
	= chars:[0-9a-zA-Z-_.]+ { return chars.join(''); }
	/ quotation_mark chars:char* quotation_mark {
	return chars.join('');
}

quotation_mark = '"'

char
	= unescaped
	/ escape sequence:(
		  '"'
		/ '\\'
		/ '/'
		/ 'b' { return '\b'; }
		/ 'f' { return '\f'; }
		/ 'n' { return '\n'; }
		/ 'r' { return '\r'; }
		/ 't' { return '\t'; }
		/ 'u' digits:$(HEXDIG HEXDIG HEXDIG HEXDIG) {
			return String.fromCharCode(parseInt(digits, 16));
		}
	) { return sequence; }

unescaped = [\x20-\x21\x23-\x5B\x5D-\u10FFFF]

escape = '\\'

// Core ABNF Rules
// See RFC 4234, Appendix B (http://tools.ietf.org/html/rfc4627).
DIGIT = [0-9]
HEXDIG = [0-9a-f]i

//====================================================================
// Common

nl 'new line' = '\r\n' / '\n' / '\r'

ws 'whitespace' = [ \t]
