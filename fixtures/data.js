module.exports = {
  relation: 'foo',
  attributes: [
    {
      name: 'date',
      type: 'date'
    },
    {
      name: 'dateWithFormat',
      type: 'date',
      format: 'MM/DD/YY'
    },
    {
      name: 'numeric',
      type: 'numeric'
    },
    {
      name: 'string',
      type: 'string'
    },
    {
      name: 'enumerate',
      type: 'enum',
      values: [
        'foo',
        'bar',
        'baz'
      ]
    }
  ],
  data: [
    {
      date: new Date(Date.UTC(2014, 11, 16, 19, 42, 01)),
      dateWithFormat: new Date(Date.UTC(2015, 5, 23)),
      numeric: 3.259,
      string: 'can have spaces',
      enumerate: 'bar'
    },
    {
      date: new Date(Date.UTC(2014, 11, 16, 19, 42, 01)),
      numeric: 42,
    }
  ]
};
