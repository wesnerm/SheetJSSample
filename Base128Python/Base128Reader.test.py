import Base128Reader
import unittest


class Base128ReaderTest(unittest.TestCase):

    def __init__(self, view):
        self.view = view
        self.offset = 0

        self.array = [0] * 1000
        self.reader = Base128Reader(array)

        for i in range(31):
            self.reader.write(1 << i)

        self.reader.reset()

