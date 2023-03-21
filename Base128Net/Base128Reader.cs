using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Base128Net;

/// <summary>
/// Reads base128 values in protobuf
/// </summary>
internal class Base128Reader
{
    public Memory<byte> view;

    public int Offset;

    public Base128Reader(Memory<byte> view)
    {
        this.view = view;
    }

    /// <summary>
    /// Reset position to beginning of data after a read or write
    /// </summary>
    public void Reset()
    {
        this.Offset = 0;
    }

    /// <summary>
    /// Parse 16-bit integer from base128
    /// </summary>
    /// <returns></returns>
    public long ParseInt64()
    {
        long result = 0L;
        Span<byte> view = this.view.Span;
        while (true)
        {
            long tmp = view[Offset];
            result |= (tmp & 0x7fL) << (Offset * 7);
            Offset++;
            if ((tmp & 0x80) == 0)
                break;
        }
        return result;
    }


    /// <summary>
    /// Parse 32-bit integer from base128
    /// </summary>
    /// <returns></returns>
    public int ParseInt32()
    {
        int result = 0;
        Span<byte> view = this.view.Span;
        while (true)
        {
            int tmp = view[Offset];
            result |= (tmp & 0x7f) << (Offset * 7);
            Offset++;
            if ((tmp & 0x80) == 0)
                break;
        }
        return result;
    }


    /// <summary>
    /// Writes number to memory in base128
    /// </summary>
    /// <param name="number"></param>
    public void Write(long number)
    {
        Span<byte> view = this.view.Span;
        while (true)
        {
            int data = (int)(number & 0x7f);
            if (number < 128)
            {
                view[this.Offset++] = (byte) data;
                break;
            }
            view[this.Offset++] = (byte)(data | 0x80);
            number >>= 7;
        }
    }

    /// <summary>
    /// Converts signed integers to zigzag format
    /// </summary>
    /// <param name="number"></param>
    /// <returns></returns>
    internal long ConvertToSignedZigZag(long number)
    {
        return number >= 0 ? (number << 1) : (~number << 1 | 1);
    }

    /// <summary>
    /// Converts zigzag numbers to signed integers
    /// </summary>
    /// <param name="number"></param>
    /// <returns></returns>
    internal long ConvertFromUnsignedZigZag(long number)
    {
        return -(number & 1) ^ (number >> 1);
    }

}
