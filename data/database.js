﻿(function (database) {
	
	var mongodb = require('mongodb');
	var mongoUrl = "mongodb://localhost:27017/theBoard"; // db is created when called
	var theDb = null;

	database.getDb = function (next) {
		if (!theDb) {
			// connect to the database

			// mongo supports connection pooling

			mongodb.MongoClient.connect(mongoUrl, function (err, db) {
				if (err) {
					next(err, null);
				} else {
					theDb = {
						db: db,
						notes: db.collection("notes")
					};
					next(null, theDb);
				}
			});
		} else {
			next(null, theDb);
		}
	}

})(module.exports);