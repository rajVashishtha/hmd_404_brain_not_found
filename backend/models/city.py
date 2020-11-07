from db import db

class City(db.Model):
    __tablename__ = 'cities'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(40), nullable=False)
    city_code = db.Column(db.String(10), nullable=True)

    state_id = db.Column(db.Integer, db.ForeignKey('states.id'), nullable=False)

