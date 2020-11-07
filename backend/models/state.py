from typing import List
from db import db


class State(db.Model):
    __tablename__ = 'states'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(40), unique=True, index=True, nullable=False)

    cities = db.relationship('City', backref='state', lazy='dynamic')

    @classmethod
    def find_by_id(cls, state_id: int) -> 'State':
        return cls.query.filter_by(id=state_id).first()

    @classmethod
    def find_by_name(cls, name: str) -> 'State':
        return cls.query.filter_by(name=name).first()

    # @classmethod
    # def find_all_cities(cls, state_id) -> List['Cities']:
    #     state = cls.query.filter_by(id=state_id).first()
    #     return state.cities.all()

