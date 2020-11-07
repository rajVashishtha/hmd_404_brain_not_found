from db import db
from datetime import datetime
from .user import User
from .blood_bank import BloodBank


class Notifications(db.Model):
    __tablename__ = 'notifications'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column('User', db.ForeignKey('users.id'), nullable=False)
    bank_id = db.Column('BloodBank', db.ForeignKey('blood_banks.id'), nullable=False)
    date = db.Column(db.DateTime, default=datetime.now, nullable=False)
    message = db.Column(db.String(60), nullable=True)

