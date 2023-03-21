// Import the benchtable module
import BenchTable from 'benchtable'

// Create benchtable suite
var suite = new BenchTable('test', { isTransposed : false });

suite
    // Add functions for benchmarking
    .addFunction('RegExp#test', s => /o/.test(s))
    .addFunction('String#indexOf', s => s.indexOf('o') > -1)
    // Add inputs
    .addInput('Short string', ['Hello world!'])
    .addInput('Long string', [`This is a ${new Array(100).join('very ')} + 'big string, isnt it? It is. ${new Array(100).join('Really. ')} So, hello world!`])
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