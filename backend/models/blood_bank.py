from datetime import datetime
from typing import List
from app import db
from .blood_bag import BloodBag
from utilities.blood_group import BloodGroupType


class BloodBank(db.Model):
    __tablename__ = "blood_banks"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(64), nullable=False)

    email = db.Column(db.String(120), index=True, unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    registered_on = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    mobile_no = db.Column(db.String(10), nullable=False)
    address = db.Column(db.String(400), nullable=False)
    state = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    pin_code = db.Column(db.String(6), nullable=False)

    latitude = db.Column(db.Float, nullable=True)
    longitude = db.Column(db.Float, nullable=True)

    bags = db.relationship('BloodBag', backref='bank', lazy='dynamic')

    @classmethod
    def find_by_name(cls, name: str) -> 'BloodBank':
        return cls.query.filter_by(name=name).first()

    @classmethod
    def find_all_like_name(cls, name: str) -> 'BloodBank':
        search = f"%{name}%"
        return cls.query.filter(cls.name.like(search)).all()

    @classmethod
    def find_by_email(cls, email: str):
        return cls.query.filter_by(email=email).first()

    @classmethod
    def find_by_id(cls, bank_id: int) -> 'BloodBank':
        return cls.query.filter_by(id=bank_id).first()

    @classmethod
    def find_all(cls) -> List['BloodBank']:
        return cls.query.all()

    @classmethod
    def find_all_by_state_city(cls, state: str, city: str):
        return cls.query.filter_by(state=state, city=city).all()

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return f"{self.name} in {self.city}, {self.state}"

    @classmethod
    def find_all_by_group(cls, group: BloodGroupType):
        banks = BloodBank.query.all()
        li = []

        for bank in banks:
            bags = BloodBag.find_all_by_bank_and_group(bank.id, group)
            li.append((bank, sum(bag.total_ml() for bag in bags)))

        li = sorted(li, key=lambda x: x[1])
        res = [b[0] for b in li]
        return res

# class BloodGroup(db.Model):
#     __tablename__ = "blood_groups"
#
#     id = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     group = db.Column(db.String(2))
#     is_positive = db.Column(db.Boolean)
#
#     def __repr__(self):
#         if self.is_positive:
#             return f"{self.group}+"
#         return f"{self.group}-"


# class TotalBlood(db.Model):
#     __tablename__ = "total_blood"
#
#     id = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     blood_bank_id = db.Column(db.Integer, db.ForeignKey('blood_bank.id'))
#     blood_group_id = db.Column(db.Integer, db.ForeignKey('blood_group.id'))
#     total_ml = db.Column(db.Integer)
#
#     def __repr__(self):
#         return f"{self.blood_bank_id} has {self.total_ml} ml of {self.blood_group_id}"
#
