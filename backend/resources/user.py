from flask_restful import Resource
from flask import request
from flask_jwt_extended import jwt_required
from pass_hash import bcrypt

from models.user import User
from schemas.user import UserSchema

# Response Messages
USER_ALREADY_EXISTS = "A user with that email already exists."
CREATED_SUCCESSFULLY = "User created successfully."
USER_NOT_FOUND = "User not found."
USER_DELETED = "User deleted."

user_schema = UserSchema()
user_list_schema = UserSchema(many=True)


class UserListAPI(Resource):

    @classmethod
    # @jwt_required
    def get(cls):
        user_list = user_list_schema.dump(User.find_all())
        return {"users": user_list}, 200

    # noinspection DuplicatedCode
    @classmethod
    def post(cls):
        user_json = request.get_json()
        user = user_schema.load(user_json)

        if User.find_by_email(user.email):
            return {"message": USER_ALREADY_EXISTS}, 400

        pw_hash = bcrypt.generate_password_hash(user.password)
        user.password = pw_hash.decode()  # convert bytes to string
        user.save_to_db()

        return {"message": CREATED_SUCCESSFULLY}, 201


# noinspection DuplicatedCode
class UserAPI(Resource):

    @classmethod
    # @jwt_required
    def get(cls, user_id: int):
        user = User.find_by_id(user_id)
        if not user:
            return {"message": USER_NOT_FOUND}, 404

        return user_schema.dump(user), 200

    @classmethod
    @jwt_required
    def delete(cls, user_id: int):
        user = User.find_by_id(user_id)
        if not user:
            return {"message": USER_NOT_FOUND}, 404

        user.delete_from_db()
        return {"message": USER_DELETED}, 200

