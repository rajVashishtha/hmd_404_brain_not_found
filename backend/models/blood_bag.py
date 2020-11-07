from datetime import datetime
from typing import List
from db import db
from utilities.blood_group import BloodGroupType


class BloodBag(db.Model):
    __tablename__ = "blood_bags"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    blood_bank_id = db.Column(db.Integer, db.ForeignKey('blood_banks.id'), nullable=False)
    bag_size_id = db.Column(db.Integer, db.ForeignKey('bag_sizes.id'), nullable=False)

    blood_group = db.Column(db.Enum(BloodGroupType), nullable=False)
    quantity = db.Column(db.Integer, default=0, nullable=False)
    collection_date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    expiry_date = db.Column(db.DateTime, nullable=False)

    # blood_bank = db.relationship('BloodBag', backref=db.backref('blood_bags', lazy='dynamic'))
    # bag_size = db.relationship("BagSize", foreign_keys=[bag_size_id], lazy='dynamic')

    def total_ml(self) -> int:
        return self.size.volume * self.quantity

    @classmethod
    def find_all(cls):
        return cls.query.all()

    @classmethod
    def find_all_by_bank(cls, bank_id: int) -> List['BloodBag']:
        return cls.query.filter_by(blood_bank_id=bank_id).all()

    @classmethod
    def find_all_by_bank_and_group(cls, bank_id: int, group: int) -> List['BloodBag']:
        blood_group = BloodGroupType(group)
        query = cls.query.filter_by(blood_bank_id=bank_id,
                                    blood_group=blood_group)
        return query.all()

    @classmethod
    def find_by_bank_group_size(cls, bank_id: int, group: int, size_id: int) -> 'BloodBag':
        blood_group = BloodGroupType(group)
        query = cls.query.filter_by(blood_bank_id=bank_id,
                                    blood_group=blood_group,
                                    bag_size_id=size_id)
        return query.first()

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return f"{self.blood_bank_id} has {self.quantity} bags of \
        ({self.bag_size}) of {self.blood_group.name} group"

