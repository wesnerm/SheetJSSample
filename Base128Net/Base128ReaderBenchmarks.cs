using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BenchmarkDotNet;
using BenchmarkDotNet.Attributes;
using Xunit;

namespace Base128Net;

public class Base128ReaderBenchmarks
{
    Base128Reader reader = CreateReader(1000, Enumerable.Range(0, 31).Select(x => 1L << x).ToArray());

    private static Base128Reader CreateReader(int size, params long[] list)
    {
        var array = new byte[size];
        var reader = new Base128Reader(array);
        foreach (var v in list)
            reader.Write(v);
        reader.Reset();
        return reader;
    }

    [GlobalSetup]
    public void Setup()
    {

    }

    [Benchmark]
    [Fact]
    public void ParseInt64Test()
    {
        reader.Reset();
        for (int i = 0; i < 31; i++)
            reader.ParseInt64();
    }

    [Benchmark]
    [Fact]
    public void ParseInt32Test()
    {
        reader.Reset();
        for (int i = 0; i < 31; i++)
            reader.ParseInt32();
    }

}
