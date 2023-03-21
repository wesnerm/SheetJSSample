## Detailed results 

### Base128ReaderBenchmarks.ParseInt64Test: DefaultJob

```
Runtime = .NET 6.0.15 (6.0.1523.11507), X64 RyuJIT AVX2; GC = Concurrent Workstation
Mean = 293.061 ns, StdErr = 6.776 ns (2.31%), N = 87, StdDev = 63.206 ns
Min = 235.423 ns, Q1 = 247.595 ns, Median = 268.414 ns, Q3 = 313.340 ns, Max = 539.783 ns
IQR = 65.745 ns, LowerFence = 148.978 ns, UpperFence = 411.956 ns
ConfidenceInterval = [269.972 ns; 316.150 ns] (CI 99.9%), Margin = 23.089 ns (7.88% of Mean)
Skewness = 1.75, Kurtosis = 5.96, MValue = 2.2

-------------------- Histogram --------------------
[216.701 ns ; 239.703 ns) | @
[239.703 ns ; 277.147 ns) | @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
[277.147 ns ; 321.816 ns) | @@@@@@@@@@@@@@@@
[321.816 ns ; 337.207 ns) | @
[337.207 ns ; 374.651 ns) | @@@@@@@
[374.651 ns ; 413.117 ns) | @@@@@
[413.117 ns ; 450.668 ns) | @@@
[450.668 ns ; 488.112 ns) |
[488.112 ns ; 508.905 ns) |
[508.905 ns ; 546.349 ns) | @@
---------------------------------------------------
```

### Base128ReaderBenchmarks.ParseInt32Test: DefaultJob

```
Runtime = .NET 6.0.15 (6.0.1523.11507), X64 RyuJIT AVX2; GC = Concurrent Workstation
Mean = 229.068 ns, StdErr = 1.513 ns (0.66%), N = 97, StdDev = 14.903 ns
Min = 208.076 ns, Q1 = 218.820 ns, Median = 221.791 ns, Q3 = 237.062 ns, Max = 275.256 ns
IQR = 18.242 ns, LowerFence = 191.457 ns, UpperFence = 264.425 ns
ConfidenceInterval = [223.931 ns; 234.204 ns] (CI 99.9%), Margin = 5.137 ns (2.24% of Mean)
Skewness = 1.06, Kurtosis = 3.32, MValue = 2.49
-------------------- Histogram --------------------
[205.923 ns ; 214.413 ns) | @@@@@
[214.413 ns ; 222.928 ns) | @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
[222.928 ns ; 235.242 ns) | @@@@@@@@@@@@@@@@@@
[235.242 ns ; 243.346 ns) | @@@@@
[243.346 ns ; 251.860 ns) | @@@@@@@@@@@@@@@
[251.860 ns ; 258.033 ns) | @@
[258.033 ns ; 269.309 ns) | @@@
[269.309 ns ; 279.513 ns) | @@
---------------------------------------------------
```

## Summary

```
BenchmarkDotNet=v0.13.5, OS=Windows 11 (10.0.22621.1413/22H2/2022Update/SunValley2)
Intel Core i7-8750H CPU 2.20GHz (Coffee Lake), 1 CPU, 12 logical and 6 physical cores
.NET SDK=7.0.202
  [Host]     : .NET 6.0.15 (6.0.1523.11507), X64 RyuJIT AVX2
  DefaultJob : .NET 6.0.15 (6.0.1523.11507), X64 RyuJIT AVX2
```

|         Method |     Mean |    Error |   StdDev |   Median | Ops/sec  |
|--------------- |---------:|---------:|---------:|---------:|----------:
| ParseInt64Test | 293.1 ns | 23.09 ns | 63.21 ns | 268.4 ns | 3411804  |
| ParseInt32Test | 229.1 ns |  5.14 ns | 14.90 ns | 221.8 ns | 4364906  |


