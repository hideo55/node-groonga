
# node-groonga

  groonga interface for Node.js

## Tutorial

	var Groonga = require(‘groonga’).Groonga;
	var groonga = new Groonga({
		host : ‘example.com’,
		port : 10041,
		resultObjectMapper : ‘default’
	});

	groonga.select(‘Books’,{
		match_columns : ‘title’,
		query : ‘foo’
	},function(err,res){
		var items = res.getItems();
		//do something
	});
	
## API

### Constructor(options)

* options
  * `protocol` : supported only 'http'
  * `host` : groonga host address
  * `port` : groonga port
  * `resultObjectMapper` : 'default' or function to mapping grroonga result object.

### select(table, options, cb)
* `table` : table name
* `options`
  * `match_columns`
  * `query`
  * `filter`
  * `scorer`
  * `sortby`
  * `output_columns`
  * `offset`
  * `limit`
  * `drilldown`
  * `drilldown_sortby`
  * `drilldown_output_columns`
  * `drilldown_offset`
  * `drilldown_limit`
  * `cacge`
  * `match_escalation_threshold`
* `cb` : callbak

### createTable(name, options, cb)

### removeTable(name, options, cb)

### getTableList(cb)

### createColumn(table, name, flags, type, options, cb)

### removeColumn(table, name, cb)

### getColumnList(table, cb)

### defineSelector(name, table, options, cb)

### defrag(objname, threshold, cb)

### deleteRecord(table, options, cb)

### dump(tables, cb)

### load(table, values, options, cb)

### suggest(types, table, column, query, cb)

### getStatus(cb)

### shutdown(cb)

### quit(cb)

### logLevel(level, cb)

### logPut(level, message, cb)

### logReopen(cb)

### addView(view, table, cb)

## TODO

* tests
* documents

## License 

(The MIT License)

Copyright (c) 2011 hide_o_55 &lt;hide.o.j55{at}gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.