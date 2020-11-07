from typing import List
from datetime import datetime
from app import db
from utilities.blood_group import BloodGroupType
from .donation import Donation


class User(db.Model):
    __tablename__ = "users"

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

    blood_group = db.Column(db.Enum(BloodGroupType), nullable=True)
    last_donation_date = db.Column(db.DateTime, nullable=True)

    donations = db.relationship('Donation', backref='user', lazy='dynamic')

    @classmethod
    def find_by_username(cls, username: str) -> 'User':
        return cls.query.filter_by(username=username).first()

    @classmethod
    def find_by_email(cls, email: str) -> 'User':
        return cls.query.filter_by(email=email).first()

    @classmethod
    def find_by_id(cls, user_id: int) -> 'User':
        return cls.query.filter_by(id=user_id).first()

    @classmethod
    def find_all(cls) -> List['User']:
        return cls.query.all()

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()

