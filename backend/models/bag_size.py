from db import db
from .blood_bag import BloodBag

class BagSize(db.Model):
    __tablename__ = "bag_sizes"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    volume = db.Column(db.Integer, nullable=False)

    bag = db.relationship('BloodBag', backref='size', lazy='dynamic')

    def __repr__(self):
        return f"{self.volume} ml"

    @classmethod
    def find_by_id(cls, size_id: int) -> 'BagSize':
        return cls.query.filter_by(id=size_id).first()

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()

