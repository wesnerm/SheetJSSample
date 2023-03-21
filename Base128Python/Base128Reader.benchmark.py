import textwrap
from Base128Reader import Base128Reader
import timeit;

array = [0] * 1000
reader = Base128Reader(array)

for i in range(31):
    reader.write(1 << i)

reader.reset()


def bench():
    reader.reset()
    for i in range(31):
        reader.parseInteger();

t = timeit.Timer(textwrap.dedent(
    """
    reader.reset()
    for i in range(31):
        reader.parseUInteger();

    """),
    textwrap.dedent(
        """
        from Base128Reader import Base128Reader
        array = [0] * 1000
        reader = Base128Reader(array)

        for i in range(31):
            reader.write(1 << i)

        reader.reset()
        """))

print('TIMEIT:')
iterations = 10000
result = t.timeit(iterations) / iterations
ops = 1/result
print(f"Period: {result}")
print(f"Ops per second: {ops}")