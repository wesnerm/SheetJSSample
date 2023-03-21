// Import the benchtable module
var BenchTable = require ('benchtable')
var Base128Reader = require('./Base128Reader.js')

// Create benchtable suite
var suite = new BenchTable('test', { isTransposed : false });

// Setup reader
var view = new Uint8Array(new ArrayBuffer(1000));
var reader = new Base128Reader(view);

for (let i of Array(31).keys())
{
    reader.writeBigInt(i);
}

reader.reset();


suite
    // Add functions for benchmarking
    .addFunction('BigInt test', s => {
        reader.reset();

        for (let i = 0; i < 31; i++)
            reader.parseBigInt();
    })
    .addFunction('Uint32 test', s => {
        reader.reset();
        for (let i = 0; i < 31; i++)
            reader.parseUint32();
    })
    // Add inputs
    .addInput("Standard", [0])
    // Add listeners
    .on('cycle', event => {
        console.log(event.target.toString());
        console.log('Period=' + event.target.times.period.toFixed(12) + '; Hz=' + Math.round(event.target.hz));
    })
    .on('complete', () => {
        console.log('Fastest is ' + suite.filter('fastest').map('name'));
        console.log(suite.table.toString());
    })
    // Run async
    .run({ async: false })
    ;