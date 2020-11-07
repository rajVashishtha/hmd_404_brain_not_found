from typing import List
from datetime import datetime, timedelta
from app import db


class Donation(db.Model):
    __tablename__ = 'donations'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    blood_bank_id = db.Column(db.Integer, db.ForeignKey('blood_banks.id'), nullable=False)

    volume_donated = db.Column(db.Integer, nullable=False)
    date_of_donation = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    @classmethod
    def find_all_by_user_id(cls, user_id: int) -> List['Donation']:
        return cls.query.filter_by(user_id=user_id).all()

    @classmethod
    def find_all_by_timespan(cls, user_id: int, months: int, years: int = 0) -> List['Donation']:
        days = (years * 365) + (months * 30)
        previous_date = datetime.now() - timedelta(days=days)
        return cls.query.filter(cls.user_id == user_id, cls.date_of_donation >= previous_date).all()

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()

