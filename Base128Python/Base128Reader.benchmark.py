import Base128Reader
import pyperf;
import timeit;

array = [0] * 1000
reader = Base128Reader(array)

for i in range(31):
    reader.write(1 << i)

reader.reset()


