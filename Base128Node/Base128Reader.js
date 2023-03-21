module.exports = class Base128Reader {
    constructor(view /*:Uint8Array*/) {
        this.view = view
        this.offset = 0
    }

    reset() {
        this.offset = 0
    }

    parseBigInt() {
        let result = 0n;
        let view = this.view;
        for (var i = this.offset; true; i++) {
            let tmp = view[i];
            result |= BigInt(tmp & 0x7f) << BigInt(i * 7);
            if (!(tmp & 0x80))
                break;
        }
        this.offset = i + 1;
        return result;
    }

    parseUint32() {
        let result = 0;
        let view = this.view;
        for (var i = this.offset; true; i++) {
            let tmp = view[i];
            result |= (tmp & 0x7f) << (i * 7);
            if (!(tmp & 0x80))
                break;
        }
        this.offset = i + 1;
        return result;
    }


    convertToSignedZigZag(number) {
        return number >= 0 ? (number << 1) : (~number << 1 | 1);
    }

    convertFromUnsignedZigZag(number) {
        return -(number & 1) ^ (number >> 1);
    }

    writeBigInt(number) {
        let view = this.view;
        number = BigInt(number)

        while (true) {
            let data = Number(number & 0x7fn);
            if (number < 128) {
                view[this.offset++] = data
                break;
            }
            view[this.offset++] = data | 0x80;
            number >>= 7n;
        }
    }
}