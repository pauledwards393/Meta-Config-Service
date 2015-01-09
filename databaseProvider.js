var mongojs = require('mongojs');
var config = require('./config');

var DatabaseProvider = function() {
	this.db = mongojs(config.dbConnection);
};

DatabaseProvider.prototype.findAll = function(collectionName, callback) {
	this.db.collection(collectionName).find(function(err, collection) {
		if (err)
			callback(err);
		else
			callback(null, collection);
	});
};

DatabaseProvider.prototype.insert = function(collectionName, obj, callback) {
	this.db.collection(collectionName).insert(obj, function(err, obj) {
		if (err)
			callback(err)
        else 
        	callback(null, obj);
	});
};

module.exports = new DatabaseProvider();