/*
 * bop-scanner
 * https://github.com/acao/bop-scanner
 *
 * Copyright (c) 2014 Richard Schulte
 * Licensed under the MIT license.
 */
'use strict';

var request = require('superagent');
var ops = require('./dbops');
var _ = require('lodash');
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;


exports.locationsIndex = function() {
  request
  .get('http://www.bop.gov/PublicInfo/execute/locations/')
  .query({todo: 'query'})
  .query({output: 'json'})
  .end(function(res){
    ops.insertLocations(res.body.Locations);
  });
};

exports.locationsFull = function() {
  MongoClient.connect('mongodb://127.0.0.1:27017/bopscanner', function(err, db) {
    if(err) throw err;
    var collection = db.collection('locations_index');
    collection.distinct('code', function(err, docs) {
      if(err) throw err;
      db.close();
        _.forEach(docs, function(code){
          request
          .get('http://www.bop.gov/PublicInfo/execute/phyloc')
          .query({todo: 'query'})
          .query({output: 'json'})
          .query({code: code})
          .end(function(res){
            res.body.code = code;
            ops.upsertLocation(res.body);
          });
        });
    });
  });

};
