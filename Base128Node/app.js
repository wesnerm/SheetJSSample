
'use strict';
import Benchmark from 'benchmark';
//const Benchmark = require('benchmark')

import ProtobufReader from './Base128Reader.js'

const buffer = new ArrayBuffer(8);

buffer[4] = 22;

console.log('The new ArrayBuffer is :', buffer);//22

buffer[4] = 23;
const sliced = new Uint8Array(buffer.slice(4, 8));

buffer[4] = 24;
sliced[1] = 25;
console.log('The new Sliced ArrayBuffer is :', sliced);//22


setTimeout(function () { }, 3000);


