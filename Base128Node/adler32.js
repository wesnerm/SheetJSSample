var MOD = 65521;

// see https://github.com/facebook/react/pull/4400/files

// This is a clean-room implementation of adler32 designed for detecting
// if markup is not what we expect it to be. It does not need to be
// cryptographically strong, only reasonably good at detecting if markup
// generated on the server is different than that on the client.
function adler32Original(data) {
    var a = 1;
    var b = 0;
    for (var i = 0; i < data.length; i++) {
        a = (a + data.charCodeAt(i)) % MOD;
        b = (b + a) % MOD;
    }
    return a | (b << 16);
}


// adler32 is not cryptographically strong, and is only used to sanity check that
// markup generated on the server matches the markup generated on the client.
// This implementation (a modified version of the SheetJS version) has been optimized
// for our use case, at the expense of conforming to the adler32 specification
// for non-ascii inputs.
export default function adler32(data) {
    var a = 1;
    var b = 0;
    var i = 0;
    var l = data.length;
    var m = l & ~0x3;
    while (i < m) {
        for (; i < Math.min(i + 4096, m); i += 4) {
            b += (
                (a += data.charCodeAt(i)) +
                (a += data.charCodeAt(i + 1)) +
                (a += data.charCodeAt(i + 2)) +
                (a += data.charCodeAt(i + 3))
            );
        }
        a %= MOD;
        b %= MOD;
    }
    for (; i < l; i++) {
        b += (a += data.charCodeAt(i));
    }
    a %= MOD;
    b %= MOD;
    return a | (b << 16);
}