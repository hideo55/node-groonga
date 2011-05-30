var http = require('http');
var _ = require('underscore')._;

var groongaHttp = function(host, port){
	this.host = host || 'localhost';
	this.port = port || 10041;;
	
}

groongaHttp.prototype = {
		_getGroongaCommandPath : function(command, args){
			var url = "/d/";
			url = url + encodeURI(command) + ".json?";
			var qs = new Array();
			for(var key in args){
				var val = args[key];
				if( command == "load" && key == "values" ){
					val = val.stringfy();
				}else if( val instanceof Array ){
					val = val.join(",");
				}
				key = encodeURI(key);
				val = encodeURI(val);
				qs.push(key + "=" + val);
			}
			url = url + qs.join("&");
			return url;
			
		},
		call : function(command, args, cb){
			var path = this._getGroongaCommandPath(command, args);
			
			http.get({
				"host" : this.host,
				"port" : this.port,
				"path" : path, 
			},function(res){
				var body = '';
				res.on('data',function(data){
					body += data.toString();
				});
				res.on('end',function(){
					var json = JSON.parse(body);
					cb(null, json);
				});
				
			}).on('error', function(e){
				cb(e, null);
			});
		}
};

exports.groongaHttp = groongaHttp;