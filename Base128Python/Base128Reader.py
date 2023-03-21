

class Base128Reader:
    def __init__(self, view):
        self.view = view
        self.offset = 0

    def reset(self):
        self.offset = 0

    def parseUInteger(self):
        view = self.view
        result = 0
        while True:
            tmp = view[self.offset]
            result |= (tmp & 0x7f) << (self.offset * 7)
            self.offset += 1
            if ((tmp & 0x80) == 0):
                break
        return result

    def parseInt32(self):
        result = self.parseInteger(self)
        return (result >> 1) if (result & 1)==0 else ~(result >> 1)

