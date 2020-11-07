from flask_restful import Resource
from flask import request
from flask_jwt_extended import jwt_required

from models.blood_bag import BloodBag
from models.bag_size import BagSize
from models.blood_bank import BloodBank

from schemas.blood_bag import BloodBagSchema
from utilities.blood_group import BloodGroupType

# Response Messages
UPDATED_SUCCESSFULLY = "Bank's blood stocks updated successfully."
BANK_DOES_NOT_EXIST = "Blood bank with <id={}> not found."
INVALID_BLOOD_GROUP = "Invalid blood group."
INVALID_BAG_SIZE = "Invalid blood bag size."

bag_schema = BloodBagSchema()
bag_list_schema = BloodBagSchema(many=True)


class AllBloodBagsAPI(Resource):

    @classmethod
    def get(cls):
        bag_list = bag_list_schema.dump(BloodBag.find_all())
        return {"bags": bag_list}, 200


class BloodBagsByBankAPI(Resource):

    @classmethod
    def get(cls, bank_id: int):
        if not BloodBank.find_by_id(bank_id):
            return {"message": BANK_DOES_NOT_EXIST.format(bank_id)}, 404

        bags = BloodBag.find_all_by_bank(bank_id)
        bag_list = bag_list_schema.dump(bags)

        # for bag in bag_list:
        #     bag['bank_id'] = bank_id

        return {"bags": bag_list}, 200

    @classmethod
    # @jwt_required
    def post(cls, bank_id: int):
        if not BloodBank.find_by_id(bank_id):
            return {"message": BANK_DOES_NOT_EXIST.format(bank_id)}, 404

        bag_json = request.get_json()

        blood_group = bag_json['blood_group']
        if not BloodGroupType.has_key_member(blood_group):
            return {"message": INVALID_BLOOD_GROUP}, 400

        bag_size_id = bag_json['bag_size_id']
        if not BagSize.find_by_id(bag_size_id):
            return {"message": INVALID_BAG_SIZE}, 400

        bag = bag_schema.load(bag_json)
        bag.blood_bank_id = bank_id
        bag.bag_size_id = bag_size_id

        bag.save_to_db()
        return {"message": UPDATED_SUCCESSFULLY}, 200


class BloodBagsByBankAndGroupAPI(Resource):

    @classmethod
    def get(cls, bank_id: int, group: int):
        if not BloodBank.find_by_id(bank_id):
            return {"message": BANK_DOES_NOT_EXIST.format(bank_id)}, 404

        if not BloodGroupType.has_value_member(group):
            return {"message": INVALID_BLOOD_GROUP}, 400

        blood_group = BloodGroupType(group)
        bags = BloodBag.find_all_by_bank_and_group(bank_id, blood_group)

        return {"bags": bag_list_schema.dump(bags)}, 200

