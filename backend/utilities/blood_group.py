from enum import IntEnum


class BloodGroupType(IntEnum):
    A_POS = 0
    A_NEG = 1
    B_POS = 2
    B_NEG = 3
    AB_POS = 4
    AB_NEG = 5
    O_POS = 6
    O_NEG = 7

    @classmethod
    def has_key_member(cls, name: str) -> bool:
        return name in cls.__members__

    @classmethod
    def has_value_member(cls, value: int) -> bool:
        return value in cls.__members__.values()

