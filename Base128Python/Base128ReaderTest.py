from Base128Reader import Base128Reader
import unittest

class Base128ReaderTest(unittest.TestCase):

    def create_reader(self, list):
        array = [0] * 1000
        reader = Base128Reader(array)
        for v in list:
            reader.write(v)
        reader.reset()
        return reader

    def check_integer(self, size, value):
        reader = self.create_reader([value])
        v = reader.parseUInteger()
        self.assertEqual(v, value)
        self.assertEqual(size, reader.offset)

    def test_parseInteger(self):
        self.check_integer(1, 0)
        self.check_integer(1, 127)
        self.check_integer(2, 128)
        self.check_integer(2, 16383)
        self.check_integer(3, 20000)
        self.check_integer(4, 4_000_000)
        self.check_integer(5, 1_000_000_000)
        self.check_integer(6, 1_000_000_000_000)
        self.check_integer(7, 10_000_000_000_000)
        self.check_integer(8, 1_000_000_000_000_000)
