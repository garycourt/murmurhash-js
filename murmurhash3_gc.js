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

function murmurhash3_32_gc(key, seed) {
	var remainder, bytes, h1, h1b, c1, c1b, c2, c2b, k1, i;
	
	remainder = key.length & 3; // key.length % 4
	bytes = key.length - remainder;
	h1 = seed;
	c1 = 0xcc9e2d51;
	c2 = 0x1b873593;
	i = 0;
	
	while (i < bytes) {
	  	k1 = 
	  	  ((key.charCodeAt(i) & 0xff)) |
	  	  ((key.charCodeAt(++i) & 0xff) << 8) |
	  	  ((key.charCodeAt(++i) & 0xff) << 16) |
	  	  ((key.charCodeAt(++i) & 0xff) << 24);
		++i;
		
		k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16));
		k1 = (k1 << 15) | (k1 >>> 17);
		k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16));

		h1 ^= k1;
        h1 = (h1 << 13) | (h1 >>> 19);
		h1b = (((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16));
		h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16));
	}
	
	k1 = 0;
	
	switch (remainder) {
		case 3: k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
		case 2: k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
		case 1: k1 ^= (key.charCodeAt(i) & 0xff);
		
		k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16));
		k1 = (k1 << 16) | (k1 >>> 16);
		k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16));
		h1 ^= k1;
	}
	
	h1 ^= key.length;

	h1 ^= h1 >>> 16;
	h1 = (((h1 & 0xffff) * 0xca6b) + ((((h1 >>> 16) * 0x85eb) & 0xffff) << 16));
	h1 ^= h1 >>> 13;
	h1 = (((h1 & 0xffff) * 0xae35) + ((((h1 >>> 16) * 0xc2b2) & 0xffff) << 16));
	h1 ^= h1 >>> 16;

	return h1 >>> 0;
}

/**
 * JS implementation of 128-bit version of MurmurHash3
 * 
 * @author <a href="mailto:tim@timdumol.com">Tim Dumol</a>
 * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
 * @see http://code.google.com/p/smhasher/
 * 
 * @param {string} key ASCII only
 * @param {number} seed Positive integer only
 * @return {[number]} 128-bit hash as 4 32-bit integers in an array in 
 *                    little endian order.
 */
function murmurhash3_128_raw_gc(key, seed) {
	var remainder, bytes, h1, h1b, h2, h2b, h3, h3b, h4, h4b, c1, c1b,
        c2, c2b, c3, c4, k1, i;
	
	remainder = key.length & 15; // key.length % 16
	blocks = key.length - remainder;
	h1 = seed;
	c1 = 0x239b961b;
    c2 = 0xab0e9789;
    c3 = 0x38b34ae5; 
    c4 = 0xa1e38b93;
	i = 0;
	
	while (i < blocks) {
	  	k1 = 
	  	  ((key.charCodeAt(i) & 0xff)) |
	  	  ((key.charCodeAt(++i) & 0xff) << 8) |
	  	  ((key.charCodeAt(++i) & 0xff) << 16) |
	  	  ((key.charCodeAt(++i) & 0xff) << 24);
        k2 = 
	  	  ((key.charCodeAt(++i) & 0xff)) |
	  	  ((key.charCodeAt(++i) & 0xff) << 8) |
	  	  ((key.charCodeAt(++i) & 0xff) << 16) |
	  	  ((key.charCodeAt(++i) & 0xff) << 24);
        k3 = 
	  	  ((key.charCodeAt(++i) & 0xff)) |
	  	  ((key.charCodeAt(++i) & 0xff) << 8) |
	  	  ((key.charCodeAt(++i) & 0xff) << 16) |
	  	  ((key.charCodeAt(++i) & 0xff) << 24);
        k4 = 
	  	  ((key.charCodeAt(++i) & 0xff)) |
	  	  ((key.charCodeAt(++i) & 0xff) << 8) |
	  	  ((key.charCodeAt(++i) & 0xff) << 16) |
	  	  ((key.charCodeAt(++i) & 0xff) << 24);
		++i;
		
		k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16));
		k1 = (k1 << 15) | (k1 >>> 17);
		k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16));
		h1 ^= k1;

        h1 = (h1 << 19) | (h1 >>> 13);
        h1 = ((h1 & 0xffff) + (h2 & 0xffff)) + ((((h1 >>> 16) + (h2 >>> 16)) & 0xffff) << 16);
		h1b = (((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16));
		h1 = (((h1b & 0xffff) + 0xcd1b) + ((((h1b >>> 16) + 0x561c) & 0xffff) << 16));

        k2 = (((k2 & 0xffff) * c2) + ((((k2 >>> 16) * c2) & 0xffff) << 16));
		k2 = (k2 << 16) | (k2 >>> 16);
		k2 = (((k2 & 0xffff) * c3) + ((((k2 >>> 16) * c3) & 0xffff) << 16));
		h2 ^= k2;

        h2 = (h2 << 17) | (h2 >>> 15);
        h2 = ((h2 & 0xffff) + (h3 & 0xffff)) + ((((h2 >>> 16) + (h3 >>> 16)) & 0xffff) << 16);
		h2b = (((h2 & 0xffff) * 5) + ((((h2 >>> 16) * 5) & 0xffff) << 16));
		h2 = (((h2b & 0xffff) + 0xa747) + ((((h2b >>> 16) + 0x0bca) & 0xffff) << 16));

        k3 = (((k3 & 0xffff) * c3) + ((((k3 >>> 16) * c3) & 0xffff) << 16));
		k3 = (k3 << 16) | (k3 >>> 16);
		k3 = (((k3 & 0xffff) * c4) + ((((k3 >>> 16) * c4) & 0xffff) << 16));
		h3 ^= k3;

        h3 = (h3 << 15) | (h3 >>> 17);
        h3 = ((h3 & 0xffff) + (h4 & 0xffff)) + ((((h3 >>> 16) + (h4 >>> 16)) & 0xffff) << 16);
		h3b = (((h3 & 0xffff) * 5) + ((((h3 >>> 16) * 5) & 0xffff) << 16));
		h3 = (((h3b & 0xffff) + 0x1c35) + ((((h3b >>> 16) + 0x96cd) & 0xffff) << 16));

        k4 = (((k4 & 0xffff) * c4) + ((((k4 >>> 16) * c4) & 0xffff) << 16));
		k4 = (k4 << 16) | (k4 >>> 16);
		k4 = (((k4 & 0xffff) * c1) + ((((k4 >>> 16) * c1) & 0xffff) << 16));
		h4 ^= k4;

        h4 = (h4 << 13) | (h4 >>> 19);
        h4 = ((h4 & 0xffff) + (h1 & 0xffff)) + ((((h4 >>> 16) + (h1 >>> 16)) & 0xffff) << 16);
		h4b = (((h4 & 0xffff) * 5) + ((((h4 >>> 16) * 5) & 0xffff) << 16));
		h4 = (((h4b & 0xffff) + 0x3b17) + ((((h4b >>> 16) + 0x32ac) & 0xffff) << 16));
	}
	
	k1 = 0;
    k2 = 0;
    k3 = 0;
    k4 = 0;
	
	switch (remainder) {
		case 15: k4 ^= (key.charCodeAt(i + 14) & 0xff) << 16;
     	case 14: k4 ^= (key.charCodeAt(i + 13) & 0xff) << 8;
		case 13: k4 ^= (key.charCodeAt(i + 12) & 0xff);		
		k4 = (((k4 & 0xffff) * c4) + ((((k4 >>> 16) * c4) & 0xffff) << 16));
		k4 = (k4 << 18) | (k4 >>> 14);
		k4 = (((k4 & 0xffff) * c1) + ((((k4 >>> 16) * c1) & 0xffff) << 16));
		h4 ^= k4;

        case 12: k3 ^= (key.charCodeAt(i + 11) & 0xff) << 24;
		case 11: k3 ^= (key.charCodeAt(i + 10) & 0xff) << 16;
		case 10: k3 ^= (key.charCodeAt(i + 9) & 0xff) << 8;
		case 9: k3 ^= (key.charCodeAt(i + 8) & 0xff);
		k3 = (((k3 & 0xffff) * c3) + ((((k3 >>> 16) * c3) & 0xffff) << 16));
		k3 = (k3 << 17) | (k3 >>> 15);
		k3 = (((k3 & 0xffff) * c4) + ((((k3 >>> 16) * c4) & 0xffff) << 16));
		h3 ^= k3;

        case 4: k2 ^= (key.charCodeAt(i + 7) & 0xff) << 24;
		case 3: k2 ^= (key.charCodeAt(i + 6) & 0xff) << 16;
		case 2: k2 ^= (key.charCodeAt(i + 5) & 0xff) << 8;
		case 1: k2 ^= (key.charCodeAt(i + 4) & 0xff);		
		k2 = (((k2 & 0xffff) * c2) + ((((k2 >>> 16) * c2) & 0xffff) << 16));
		k2 = (k2 << 16) | (k2 >>> 16);
		k2 = (((k2 & 0xffff) * c3) + ((((k2 >>> 16) * c3) & 0xffff) << 16));
		h2 ^= k2;

        case 4: k1 ^= (key.charCodeAt(i + 3) & 0xff) << 24;
		case 3: k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
		case 2: k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
		case 1: k1 ^= (key.charCodeAt(i) & 0xff);		
		k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16));
		k1 = (k1 << 15) | (k1 >>> 17);
		k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16));
		h1 ^= k1;
	}
	
	h1 ^= key.length;
    h2 ^= key.length;
    h3 ^= key.length;
    h4 ^= key.length;

    h1 = ((h1 & 0xffff) + (h2 & 0xffff)) + ((((h1 >>> 16) + (h2 >>> 16)) & 0xffff) << 16);
    h1 = ((h1 & 0xffff) + (h3 & 0xffff)) + ((((h1 >>> 16) + (h3 >>> 16)) & 0xffff) << 16);
    h1 = ((h1 & 0xffff) + (h4 & 0xffff)) + ((((h1 >>> 16) + (h4 >>> 16)) & 0xffff) << 16);

    h2 = ((h2 & 0xffff) + (h1 & 0xffff)) + ((((h2 >>> 16) + (h1 >>> 16)) & 0xffff) << 16);
    h3 = ((h3 & 0xffff) + (h1 & 0xffff)) + ((((h3 >>> 16) + (h1 >>> 16)) & 0xffff) << 16);
    h4 = ((h4 & 0xffff) + (h1 & 0xffff)) + ((((h4 >>> 16) + (h1 >>> 16)) & 0xffff) << 16);

    // fmixing
	h1 ^= h1 >>> 16;
	h1 = (((h1 & 0xffff) * 0xca6b) + ((((h1 >>> 16) * 0x85eb) & 0xffff) << 16));
	h1 ^= h1 >>> 13;
	h1 = (((h1 & 0xffff) * 0xae35) + ((((h1 >>> 16) * 0xc2b2) & 0xffff) << 16));
	h1 ^= h1 >>> 16;

	h2 ^= h2 >>> 16;
	h2 = (((h2 & 0xffff) * 0xca6b) + ((((h2 >>> 16) * 0x85eb) & 0xffff) << 16));
	h2 ^= h2 >>> 13;
	h2 = (((h2 & 0xffff) * 0xae35) + ((((h2 >>> 16) * 0xc2b2) & 0xffff) << 16));
	h2 ^= h2 >>> 16;

	h3 ^= h3 >>> 16;
	h3 = (((h3 & 0xffff) * 0xca6b) + ((((h3 >>> 16) * 0x85eb) & 0xffff) << 16));
	h3 ^= h3 >>> 13;
	h3 = (((h3 & 0xffff) * 0xae35) + ((((h3 >>> 16) * 0xc2b2) & 0xffff) << 16));
	h3 ^= h3 >>> 16;

	h4 ^= h4 >>> 16;
	h4 = (((h4 & 0xffff) * 0xca6b) + ((((h4 >>> 16) * 0x85eb) & 0xffff) << 16));
	h4 ^= h4 >>> 13;
	h4 = (((h4 & 0xffff) * 0xae35) + ((((h4 >>> 16) * 0xc2b2) & 0xffff) << 16));
	h4 ^= h4 >>> 16;

    h1 = ((h1 & 0xffff) + (h2 & 0xffff)) + ((((h1 >>> 16) + (h2 >>> 16)) & 0xffff) << 16);
    h1 = ((h1 & 0xffff) + (h3 & 0xffff)) + ((((h1 >>> 16) + (h3 >>> 16)) & 0xffff) << 16);
    h1 = ((h1 & 0xffff) + (h4 & 0xffff)) + ((((h1 >>> 16) + (h4 >>> 16)) & 0xffff) << 16);

    h2 = ((h2 & 0xffff) + (h1 & 0xffff)) + ((((h2 >>> 16) + (h1 >>> 16)) & 0xffff) << 16);
    h3 = ((h3 & 0xffff) + (h1 & 0xffff)) + ((((h3 >>> 16) + (h1 >>> 16)) & 0xffff) << 16);
    h4 = ((h4 & 0xffff) + (h1 & 0xffff)) + ((((h4 >>> 16) + (h1 >>> 16)) & 0xffff) << 16);

	return [h1 >>> 0, h2 >>> 0, h3 >>> 0, h4 >>> 0];
}