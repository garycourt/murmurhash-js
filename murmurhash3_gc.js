/**
 * JS Implementation of MurmurHash3 (as of April 6, 2011)
 * 
 * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
 * @see http://github.com/garycourt/murmurhash-js
 * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
 * @see http://sites.google.com/site/murmurhash/
 * 
 * @param {string} key ASCII only
 * @param {number} seed Positive integer only
 * @return {number} 32-bit positive integer hash 
 */

function murmurhash3_32_gc(key, seed){
  var remainder = key.length & 3; // key.length % 4
  var bytes = key.length - remainder;
  var h1    = seed;
  var c1    = 0xcc9e2d51;
  var c2    = 0x1b873593;
  var i     = 0;

  var c1_l  = c1 & 0xffff;
  var c1_h  = c1 & 0xffff0000;
  var c2_l  = c2 & 0xffff;
  var c2_h  = c2 & 0xffff0000;

  while (i < bytes) {
    k1 = ((key.charCodeAt(  i) & 0xff)      ) |
         ((key.charCodeAt(++i) & 0xff) << 8 ) |
         ((key.charCodeAt(++i) & 0xff) << 16) |
         ((key.charCodeAt(++i) & 0xff) << 24);
    ++i;

    k1 = (k1 * c1_l + (k1 & 0xffff) * c1_h) & 0xffffffff; // note that javascript precision is 2^53
    k1 = (k1 << 15) | (k1 >>> 17);
    k1 = (k1 * c2_l + (k1 & 0xffff) * c2_h) & 0xffffffff;

    h1 ^= k1;
    h1  = (h1 << 13) | (h1 >>> 19);
    h1  = (h1 * 5 + 0xe6546b64) & 0xffffffff;
  }

  k1 = 0;

  switch (remainder) {
    case 3: k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
    case 2: k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
    case 1: k1 ^= (key.charCodeAt(i    ) & 0xff);

    k1  = (k1 * c1_l + (k1 & 0xffff) * c1_h) & 0xffffffff;
    k1  = (k1 << 16) | (k1 >>> 16);
    k1  = (k1 * c2_l + (k1 & 0xffff) * c2_h) & 0xffffffff;
    h1 ^= k1;
  }

  h1 ^= key.length;

  h1 ^= h1 >>> 16;
  h1  = (h1 * 0xca6b + (h1 & 0xffff) * 0x85eb0000) & 0xffffffff;
  h1 ^= h1 >>> 13;
  h1  = (h1 * 0xae35 + (h1 & 0xffff) * 0xc2b20000) & 0xffffffff;
  h1 ^= h1 >>> 16;

  return h1 >>> 0;
}

(function(){
  if(typeof module !== 'undefined'){
    module.exports = murmurhash3_32_gc;
  }
})();
