const  Base128Reader = require('./Base128Reader.js')

function createReader(size, list) {
    let array = new Uint8Array(new ArrayBuffer(size));
    let reader = new Base128Reader(array);

    list.forEach(v => {
        reader.writeBigInt(v);
    })

    reader.reset();
    return reader;
}


describe('parse bigint tests', function () {
    it('Handle one byte values', function () {

        for (let i = 0n; i < 128n; i+=16n) {
            let reader = createReader(1000, [i])
            let val = reader.parseBigInt();
            expect(val).toBe(i);
            expect(reader.offset).toBe(1);
        }
    });

    it('Handle two byte values', function () {

        for (let i = 128n; i < 16384n; i+=32n) {
            let reader = createReader(1000, [i])
            let val = reader.parseBigInt();
            expect(val).toBe(i);
            expect(reader.offset).toBe(2);
        }
    });

    it('Handle three byte values', function () {

        for (let i = 20000n; i < 20004n; i++) {
            let reader = createReader(1000, [i])
            let val = reader.parseBigInt();
            expect(val).toBe(i);
            expect(reader.offset).toBe(3);
        }
    });
    it('Handle four byte values', function () {
        let i = 4000000n;
        let reader = createReader(1000, [i]);
        let val = reader.parseBigInt();
        expect(val).toBe(i);
        expect(reader.offset).toBe(4);
    });

    it('Handle five byte values', function () {
        let i = 1_000_000_000n;
        let reader = createReader(1000, [i]);
        let val = reader.parseBigInt();
        expect(val).toBe(i);
        expect(reader.offset).toBe(5);
    });

    it('Handle six byte values', function () {
        let i = 1_000_000_000_000n;
        let reader = createReader(1000, [i]);
        let val = reader.parseBigInt();
        expect(val).toBe(i);
        expect(reader.offset).toBe(6);
    });

    it('Handle seven byte values', function () {
        let i = 10_000_000_000_000n;
        let reader = createReader(1000, [i]);
        let val = reader.parseBigInt();
        expect(val).toBe(i);
        expect(reader.offset).toBe(7);
    });

    it('Handle eight byte values', function () {
        let i = 1_000_000_000_000_000n;
        let reader = createReader(1000, [i])
        let val = reader.parseBigInt();
        expect(val).toBe(i);
        expect(reader.offset).toBe(8);
    });

});

describe('parse int32 tests', function () {
    it('Handle one byte values', function () {

        for (let i = 0; i < 128; i++) {
            let reader = createReader(1000, [i])
            let val = reader.parseUint32();
            expect(val).toBe(i);
            expect(reader.offset).toBe(1);
        }
    });

    it('Handle two byte values', function () {

        for (let i = 128; i < 16384; i+=128) {
            let reader = createReader(1000, [i])
            let val = reader.parseUint32();
            expect(val).toBe(i);
            expect(reader.offset).toBe(2);
        }
    });

    it('Handle three byte values', function () {

        for (let i = 16384; i < 20000; i+=128) {
            let reader = createReader(1000, [i])
            let val = reader.parseUint32();
            expect(val).toBe(i);
            expect(reader.offset).toBe(3);
        }
    });

    it('Handle four byte values', function () {
        let i = 4000000;
        let reader = createReader(1000, [i]);
        let val = reader.parseUint32();
        expect(val).toBe(i);
        expect(reader.offset).toBe(4);
    });

    it('Handle five byte values', function () {
        let i = 1_000_000_000
        let reader = createReader(1000, [i])
        let val = reader.parseUint32();
        expect(val).toBe(i);
        expect(reader.offset).toBe(5);
    });
});
