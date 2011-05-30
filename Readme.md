
# node-groonga

  Interface to groonga

## Tutorial

	var Groonga = require(‘groonga’);
	var g = new Groonga({
		host : ‘example.com’,
		port : 10041,
		resultObjectMapper : ‘default’
	});

	g.select(‘Books’,{
		match_columns : ‘title’,
		query : ‘foo’
	},function(err,res){
		var items = res.getItems();
		//do something
	});
	
## API

### Constructor(options)

*options
  *`protocol` : supported only 'http'
  *`host` : groonga host address
  *`port` : groonga port
  *`resultObjectMapper` : 'default' or function to mapping grroonga result object.

### select(table,options,cb)
*`table` : table name
*`options`
  *`match_columns`
  *`query`
  *`filter`
  *`scorer`
  *`sortby`
  *`output_columns`
  *`offset`
  *`limit`
  *`drilldown`
  *`drilldown_sortby`
  *`drilldown_output_columns`
  *`drilldown_offset`
  *`drilldown_limit`
  *`cacge`
  *`match_escalation_threshold`
*`cb` : callbak

## TODO

* gqtp support
* memcached binary protocol support
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