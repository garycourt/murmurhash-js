// thanks to GPT4 for this updated version which is about 15% faster, probably due to use of Math.imul

/**
 * JS Implementation of MurmurHash3 (r136) (as of May 20, 2011)
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

function murmurhash3_32_gc(key, seed = 0) {
	const c1 = 0xcc9e2d51;
	const c2 = 0x1b873593;
	let h1 = seed;
	let roundedEnd = key.length & ~0x3;

	for (let i = 0; i < roundedEnd; i += 4) {
		let k1 =
		(key.charCodeAt(i) & 0xff) |
		((key.charCodeAt(i + 1) & 0xff) << 8) |
		((key.charCodeAt(i + 2) & 0xff) << 16) |
		((key.charCodeAt(i + 3) & 0xff) << 24);
		k1 = Math.imul(k1, c1);
		k1 = (k1 << 15) | (k1 >>> 17);
		k1 = Math.imul(k1, c2);

		h1 ^= k1;
		h1 = (h1 << 13) | (h1 >>> 19);
		h1 = Math.imul(h1, 5) + 0xe6546b64;
	}

	let k1 = 0;
	const val = key.length & 0x3;

	if (val === 3) {
		k1 = (key.charCodeAt(roundedEnd + 2) & 0xff) << 16;
	}
	if (val >= 2) {
		k1 |= (key.charCodeAt(roundedEnd + 1) & 0xff) << 8;
	}
	if (val >= 1) {
		k1 |= key.charCodeAt(roundedEnd) & 0xff;
		k1 = Math.imul(k1, c1);
		k1 = (k1 << 15) | (k1 >>> 17);
		k1 = Math.imul(k1, c2);
		h1 ^= k1;
	}

	h1 ^= key.length;
	h1 ^= h1 >>> 16;
	h1 = Math.imul(h1, 0x85ebca6b);
	h1 ^= h1 >>> 13;
	h1 = Math.imul(h1, 0xc2b2ae35);
	h1 ^= h1 >>> 16;

	return h1 >>> 0;
}
