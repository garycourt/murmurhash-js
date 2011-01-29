/**
 * JS Implementation of MurmurHash3 Beta (as of January 28, 2011)
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

function murmurhash3_32_gc(key, seed) {
	var remainder, bytes, h1, h1b, c1, c1b, c2, c2b, k1, i;
	
	remainder = key.length % 4;
	bytes = key.length - remainder;
	h1 = 0x971e137b ^ seed;
	c1 = 0x95543787;
	c2 = 0x2ad7eb25;
	i = 0;
	
	while (i < bytes) {
	  	k1 = 
	  	  ((key.charCodeAt(i) & 0xff)) |
	  	  ((key.charCodeAt(++i) & 0xff) << 8) |
	  	  ((key.charCodeAt(++i) & 0xff) << 16) |
	  	  ((key.charCodeAt(++i) & 0xff) << 24);
		++i;
		
		k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16));
		k1 = (k1 << 11) | (k1 >>> 21);
		k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16));
		h1 ^= k1;
		
		h1b = (((h1 & 0xffff) * 3) + ((((h1 >>> 16) * 3) & 0xffff) << 16));
		h1 = (((h1b & 0xffff) + 0x52dce729) + ((((h1b >>> 16) + 0x52dce729) & 0xffff) << 16));
	
		c1b = (((c1 & 0xffff) * 5) + ((((c1 >>> 16) * 5) & 0xffff) << 16)); 
		c1 = (((c1b & 0xffff) + 0x7b7d159c) + ((((c1b >>> 16) + 0x7b7d159c) & 0xffff) << 16));
		c2b = (((c2 & 0xffff) * 5) + ((((c2 >>> 16) * 5) & 0xffff) << 16)); 
		c2 = (((c2b & 0xffff) + 0x6bce6396) + ((((c2b >>> 16) + 0x6bce6396) & 0xffff) << 16));
	}
	
	k1 = 0;
	
	switch (remainder) {
		case 3: k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
		case 2: k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
		case 1: k1 ^= (key.charCodeAt(i) & 0xff);
		
		k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16));
		k1 = (k1 << 11) | (k1 >>> 21);
		k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16));
		h1 ^= k1;
		
		h1b = (((h1 & 0xffff) * 3) + ((((h1 >>> 16) * 3) & 0xffff) << 16));
		h1 = (((h1b & 0xffff) + 0x52dce729) + ((((h1b >>> 16) + 0x52dce729) & 0xffff) << 16));
	}
	
	h1 ^= key.length;

	h1 ^= h1 >>> 16;
	h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16));
	h1 ^= h1 >>> 13;
	h1 = (((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16));
	h1 ^= h1 >>> 16;

	return h1 >>> 0;
}