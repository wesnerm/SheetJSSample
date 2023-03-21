using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Base128Net;

public class Base128ReaderTests
{
    Base128Reader reader;

    private Base128Reader CreateReader(int size, params long[] list)
    {
        var array = new byte[size];
        var reader = new Base128Reader(array);
        foreach (var v in list)
            reader.Write(v);
        reader.Reset();
        return reader;
    }

    [Theory]
    [InlineData(1, 0)]
    [InlineData(1, 127)]
    [InlineData(2, 128)]
    [InlineData(2, 16383)]
    [InlineData(3, 20000)]
    [InlineData(4, 4_000_000)]
    [InlineData(5, 1_000_000_000)]
    [InlineData(6, 1_000_000_000_000)]
    [InlineData(7, 10_000_000_000_000)]
    [InlineData(8, 1_000_000_000_000_000)]
    public void ParseInt64Test(int size, long value)
    {
        reader = CreateReader(1000, value);
        var val = reader.ParseInt64();
        Assert.Equal(value, val);
        Assert.Equal(size, reader.Offset);
    }

    [Theory]
    [InlineData(1, 0)]
    [InlineData(1, 127)]
    [InlineData(2, 128)]
    [InlineData(2, 16383)]
    [InlineData(3, 20000)]
    [InlineData(4, 4_000_000)]
    [InlineData(5, 1_000_000_000)]
    public void ParseInt32Test(int size, int value)
    {
        reader = CreateReader(1000, value);
        var val = reader.ParseInt64();
        Assert.Equal(value, val);
        Assert.Equal(size, reader.Offset);
    }

}
