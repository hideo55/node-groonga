/*!
 * node-groonga
 * Copyright(c) 2011 hide_o_55 <hide.o.j55{at}gmail.com>
 * MIT Licensed
 */
/**
 * Library version.
 */
exports.version = '0.0.1';

var util = require('util');
var _ = require('underscore')._;

var groongaResult = function(result){
    if (!result || result.length == 3) {
        throw "Argument is invalid";
    }
    this._result = result;
};
groongaResult.prototype = {
    getStatus: function(){
        return this._result[0][0]
    },
    getStartTime: function(){
        return this._result[0][1]
    },
    getElapsedTime: function(){
        return this._result[0][2]
    },
    getBody: function(){
        return this._result[1]
    },
    getRawResult: function(){
        return this._result;
    }
};

var groongaSelectResult = function(result){
    groongaResult.call(this, result);
}
util.inherits(groongaSelectResult, groongaResult);

groongaSelectResult.prototype.getHitRowsNum = function(){
    var body = this.getBody();
    return body[0][0][0];
}

groongaSelectResult.prototype.getColumns = function(){
    var cols = _.map(this.getBody()[0][1], function(val){
        return val[0]
    });
    return cols;
}

groongaSelectResult.prototype.getItems = function(){
    var cols = this.getColumns();
    var items = new Array();
    var body = this.getBody();
    if (typeof body == 'object') {
        body[0].shift();
        body[0].shift();
        _.each(body[0], function(row){
            var item = {};
            for (var i = 0; i < cols.length; i++) {
                item[cols[i]] = row[i];
            }
            items.push(item);
        });
    }
    return items;
};

var Groonga = function(options){
    if (!options) 
        options = {};
    var protocol = options.protocol || "http";
    if (protocol == "http") {
        var groongaHttp = require("./protocol/http").groongaHttp;
        this._protocol = new groongaHttp(options.host, options.port);
    }
    else {
        throw "Protocol '" + protocol + "' is not implementeds";
    }
    
    if (options.resultObjectMapper) {
        var mapper = options.resultObjectMapper;
        if (typeof mapper == 'function') {
            this._resultObjectMapper = mapper;
        }
        else 
            if (mapper == 'default') {
                this._resultObjectMapper = function(command, res){
                    if (command == 'select') {
                        return new groongaSelectResult(res);
                    }
                    else {
                        return new groongaResult(res);
                    }
                };
            }
    }
    
}

Groonga.prototype.call = function(command, options, cb){
    var self = this;
    this._protocol.call(command, options, function(err, res){
        if (cb && typeof cb == 'function') {
            if (self._resultObjectMapper) {
                res = self._resultObjectMapper(command, res);
            }
            if (err) {
                cb(err, res);
            }
            else {
                cb(null, res);
            }
        }
    });
};

Groonga.prototype.getCacheLimit = function(cb){
    return this.call("cache_limit", {}, cb);
};

Groonga.prototype.setCacheLimit = function(cacheLimit, cb){
    return this.call("cache_limit", {
        max: cacheLimit
    }, cb);
};

Groonga.prototype.checkObject = function(object_name, cb){
    return this.call("check", {
        obj: object_name
    }, cb);
};

Groonga.prototype.clearLock = function(object_name, cb){
    return this.call("check", {
        objname: object_name
    }, cb);
};

Groonga.prototype.createColumn = function(table, name, flags, type, options, cb){
    if (!options) 
        options = {};
    _.extend(options, {
        "name": name
    });
    return this.call("column_create", {
        objname: object_name
    }, cb);
};

Groonga.prototype.removeColumn = function(table, name, cb){
    return this.call("removeColumn", {
        "table": table,
        "name": name
    }, cb);
};


Groonga.prototype.defineSelector = function(name, table, options, cb){
    if (!options) 
        options = {};
    _.extend(options, {
        "name": name,
        "table": table
    });
    return this.call("define_selector", options, cb);
};

Groonga.prototype.defrag = function(objname, threshold, cb){
    return this.call("defrag", {
        "objname": objname,
        "threshold": threshold
    }, cb);
};

Groonga.prototype.deleteRecord = function(table, options, cb){
    if (!options) 
        options = {};
    _.extend(options, {
        "table": table
    });
    return this.call("delete", options, cb);
};

Groonga.prototype.dump = function(tables, cb){
    var options = tables ? {
        "tables": tables
    } : {};
    return this.call("delete", options, cb);
};

Groonga.prototype.load = function(table, values, options, cb){
    if (!options) 
        options = {};
    _.extend(options, {
        "table": table,
        "values": values
    });
    return this.call("load", options, cb);
};

Groonga.prototype.logLevel = function(level, cb){
    return this.call("log_level", {
        "level": level
    }, cb);
};

Groonga.prototype.logLevel = function(level, message, cb){
    return this.call("log_put", {
        "level": level,
        "message": message
    }, cb);
};

Groonga.prototype.logReopen = function(cb){
    return this.call("log_reopen", {}, cb);
};

Groonga.prototype.quit = function(cb){
    return this.call("quit", {}, cb);
};

Groonga.prototype.shutdown = function(cb){
    return this.call("shutdown", {}, cb);
};

Groonga.prototype.select = function(table, cond, cb){
    if (!cond) 
        cond = {};
    _.extend(cond, {
        "table": table
    });
    return this.call("select", cond, cb);
};

Groonga.prototype.getStatus = function(cb){
    return this.call("status", {}, cb);
};

Groonga.prototype.suggest = function(types, tale, column, query, cb){
    return this.call("suggest", {
        "types": types,
        "table": table,
        "column": column,
        "query": query
    }, cb);
};

Groonga.prototype.createTable = function(name, options, cb){
    if (!options) 
        options = {};
    _.extend(options, {
        "name": name
    });
    return this.call("table_create", options, cb);
};

Groonga.prototype.getTableList = function(cb){
    return this.call("table_list", {}, cb);
};

Groonga.prototype.removeTable = function(table, cb){
    return this.call("table_remove", {
        "table": table
    }, cb);
};

Groonga.prototype.addView = function(view, table, cb){
    return this.call("view_add", {
        "view": view,
        "table": table
    }, cb);
};

exports.Groonga = Groonga;
