# bop-scanner [![Build Status](https://secure.travis-ci.org/PrisonDB/bop-scanner.png?branch=master)](http://travis-ci.org/acao/bop-scanner)

A simple tool to catalog location data from the bop.gov website in a mongo database.

At present, this is the *bare* minimum so use with caution.

## Requirements

1. Node 0.10.x
2. Mongo
3. A willingness to run code without tests against a public API

## Running

1. Run ```nmp start``` and cross your fingers

## Aftermath

Your local mongo database will have a db called bop_scanner with a locations_index and locations_full collection of documents. I haven't fully analyzed the data yet, but the index data and the full document data seem to complement eachother, thus why they are kept in seperate collections.


## TODO
1. Turn into a full API client utility, or create one that this depends on
2. Command Line tool? Or just use gulp
3. Unit tests

## License
Copyright (c) 2014 PrisonDB. Licensed under the MIT license.
