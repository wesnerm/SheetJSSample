﻿# SheetJS Project


The main goals of this project are to introduce you to lower-level JavaScript and evaluate your ability to discuss and analyze solutions.

https://protobuf.dev/programming-guides/encoding/ describes how Protocol Buffers encode data on the wire.

Traditionally, developers use a DSL to generate code that will read structs from a protobuf packet or write protobuf packets (described in the "Language Guide" section of the docs).  For many applications, the protobuf definitions evolve over time and sometimes "required" fields become "optional", so we can't trust the official definitions.  Instead, we write low-level routines to perform "shallow parsing" and extract specific fields from messages.

Typed Arrays (ArrayBuffer and typed views like Uint8Array) provide a low-level representation of a segment of memory.  In NodeJS, the built-in `fs` module reads data into Buffers (which extend Uint8Array).  In the web browser, network requests with `fetch` can return ArrayBuffers.

### Task 1: Pure JS analysis of base128 varint parsing algorithms

The Protobuf spec defines base 128 varint.  Parsing values is a common requirement for many applications, and we'd be interested in exploring high-performance implementations.

1) JavaScript has a BigInt numeric type.  Implement a parsing algorithm in JS that accepts a Uint8Array and returns the encoded value as a BigInt.

2) Most JS engines have a special fast case for signed 32-bit integers.  Implement a similar algorithm that assumes the value is within the range of a 32-bit signed int

3) compare the performance of the two algorithms for data in the signed 32-bit integer range.  Libraries like BenchmarkJS are commonly used for comparing performance of JS functions







### Task 2: Comparative analysis across languages

1) Implement the same algorithm in a scripting language (a language you are familiar with, e.g. python) and in a traditional lower-level language (e.g. Java or C/C++)

2) Compare the performance of the implementations, adjusting for startup time and other concerns.

3) Be prepared to discuss the viability of JavaScript for data munging



### Results

|                  | Javascript         | C#                | Python         |
| ---------------- | ------------------ | ----------------- | -------------- |
| BigInt           | 194,103 ops/sec    |                   |                |
| UInt64           |                    | 3,411,804 ops/sec |                |
| UInt32           | 12,857,613 ops/sec | 4,364,906 ops/sec | 17,128 ops/sec |
| UInt32 Optimized | 11,172,532 ops/sec |                   |                |

