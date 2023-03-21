using Base128Net;
using BenchmarkDotNet.Running;

var summary = BenchmarkRunner.Run<Base128ReaderBenchmarks>();


