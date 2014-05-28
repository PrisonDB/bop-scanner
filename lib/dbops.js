/*
 * dbops
 * https://github.com/acao/bop-scanner
 *
 * Copyright (c) 2014 Richard Schulte
 * Licensed under the MIT license.
 */

'use strict';
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
var codes = [];

exports.insertLocations = function (locations) {

  MongoClient.connect('mongodb://127.0.0.1:27017/bopscanner', function(err, db) {
    if(err) throw err;
    var collection = db.collection('locations_index');
    collection.insert(locations, function(err, docs) {
      collection.count(function(err, count) {
        console.log(format("count = %s", count));
        db.close();
      });
    });
  });
}

exports.getCodes = function () {
  MongoClient.connect('mongodb://127.0.0.1:27017/bopscanner', function(err, db) {
    if(err) throw err;
    var collection = db.collection('locations_index');
    collection.distinct('code', function(err, docs) {
      if(err) throw err;
    });
  });
}

exports.upsertLocation = function (location) {
  MongoClient.connect('mongodb://127.0.0.1:27017/bopscanner', function(err, db) {
    if(err) throw err;
    var collection = db.collection('locations_full');
    collection.update({code: location.code}, location, {upsert:true}, function(err, docs) {
      if(err) throw err;
      console.log("upserted " + location.Locations[0].code + " to mongo");
      db.close();
    });
  });
}
