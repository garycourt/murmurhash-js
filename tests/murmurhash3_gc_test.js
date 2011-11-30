var fs = require('fs');
var vows = require('vows');
var assert = require('assert');
var RandomURLString = require('../lib/RandomURLString');

var suite = vows.describe('murmurhash3_gc');

var nTests = 256;
var keys = [];
var hashValues1 = [];
var hashValues2 = [];
var seed = 3;

/**
 * Initializing the keys
 */
for(var i=nTests; i--;){
  keys.push(RandomURLString(4));
}

/**
 * Getting the hashvalues for the old hash function
 */
var content;
content = require('fs').readFileSync(__dirname + '/../old/murmurhash3_gc.js');
eval(content.toString());
for(var i=nTests; i--;){
  hashValues1.unshift(murmurhash3_32_gc(keys[i], seed));
}

/**
 * Getting the hashvalues for the new hash function
 */
content = require('fs').readFileSync(__dirname + '/../murmurhash3_gc.js');
eval(content.toString());
for(var i=nTests; i--;){
  hashValues2.unshift(murmurhash3_32_gc(keys[i], seed));
}

/**
 * Test start
 */
suite.addBatch({
  "murmurhash3": {
    "random": function() {
      for(var i=nTests; i--;){
        assert.strictEqual(hashValues1[i], hashValues2[i]);
      }
    }
  }
});

suite.export(module);
