from flask_restful import Resource
from flask import request
from werkzeug.security import safe_str_cmp
from flask_jwt_extended import (
    create_access_token,
    get_jwt_identity,
    jwt_required,
    get_raw_jwt,
)
from pass_hash import bcrypt

from models.user import User
from models.blood_bank import BloodBank
from schemas.auth import LoginSchema
from blacklist import BLACKLIST

login_schema = LoginSchema()

# Error Messages
INVALID_CREDENTIALS = "Invalid credentials!"
USER_LOGGED_OUT = "User <id={}> successfully logged out."


class LoginAPI(Resource):

    @classmethod
    def post(cls):
        user_json = request.get_json()
        login_data = login_schema.load(user_json)

        if login_data['is_user']:
            user = User.find_by_email(login_data['email'])
        else:
            user = BloodBank.find_by_email(login_data['email'])

        if user and bcrypt.check_password_hash(user.password, login_data['password']):
            access_token = create_access_token(identity=user.id, fresh=True)
            return {"access_token": access_token}, 200

        return {"message": INVALID_CREDENTIALS}, 401


class LogoutAPI(Resource):

    @classmethod
    @jwt_required
    def post(cls):
        jti = get_raw_jwt()["jti"]  # jti is "JWT ID", a unique identifier for a JWT.
        BLACKLIST.add(jti)
        user_id = get_jwt_identity()
        return {"message": USER_LOGGED_OUT.format(user_id)}, 200
