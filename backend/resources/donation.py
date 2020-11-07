from datetime import datetime

from flask_restful import Resource
from flask import request
from flask_jwt_extended import jwt_required
from db import db

from models.user import User
from models.blood_bank import BloodBank
from models.donation import Donation
from schemas.donation import DonationSchema

# Response Messages
DONATION_SAVED = "Donation saved successfully."
USER_NOT_FOUND = "User not found."
BANK_NOT_FOUND = "Blood bank not found."

donation_schema = DonationSchema()
donation_list_schema = DonationSchema(many=True)


class DonationsByUserAPI(Resource):

    @classmethod
    def get(cls, user_id: int):
        user = User.find_by_id(user_id)
        if not user:
            return {"message": USER_NOT_FOUND}, 404

        req = request.args

        if 'months' in req or 'years' in req:
            donations = Donation.find_all_by_timespan(user_id, int(req['months']), int(req.get('years', 0)))
        else:
            donations = user.donations.all()

        return {"donations": donation_list_schema.dump(donations)}, 200

    @classmethod
    @jwt_required
    def post(cls, user_id: int):
        user = User.find_by_id(user_id)
        if not user:
            return {"message": USER_NOT_FOUND}, 404

        donation_json = request.get_json()

        bank = BloodBank.find_by_id(donation_json['blood_bank_id'])
        if not bank:
            return {"message": BANK_NOT_FOUND}, 404

        donation = donation_schema.load(donation_json)
        user.donations.append(donation)

        # save user's last_donation_date
        user.last_donation_date = donation.date_of_donation if donation.date_of_donation else datetime.now()

        db.session.add(user)
        db.session.add(donation)

        db.session.commit()

        return {"message": DONATION_SAVED}, 201

