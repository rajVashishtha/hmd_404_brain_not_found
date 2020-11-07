from datetime import datetime

from flask import Flask, jsonify
from flask_cors import CORS
from config import Config

from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from marshmallow import ValidationError

from db import db
from ma import ma
from pass_hash import bcrypt
from blacklist import BLACKLIST

from resources.auth import LoginAPI, LogoutAPI
from resources.user import UserListAPI, UserAPI
from resources.blood_bank import (
    BankListAPI,
    BankAPI,
    # BanksByDistanceAPI,
    # BanksByStateAndCity
)
from resources.blood_bag import (
    AllBloodBagsAPI,
    BloodBagsByBankAPI,
    BloodBagsByBankAndGroupAPI
)
from resources.donation import DonationsByUserAPI
from resources.city import CitiesByStateAPI

app = Flask(__name__)
app.config.from_object(Config)

# Flask extensions
api = Api(app)
CORS(app)
jwt = JWTManager(app)
migrate = Migrate(app, db, compare_type=True)

@app.errorhandler(ValidationError)
def handle_marshmallow_validation(err):
    return err.messages, 400


# This method will check if a token is blacklisted, and will be called automatically when blacklist is enabled
@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token) -> bool:
    return decrypted_token["jti"] in BLACKLIST


api.add_resource(LoginAPI, "/login")
api.add_resource(LogoutAPI, "/logout")

api.add_resource(UserListAPI, "/users")
api.add_resource(UserAPI, "/users/<int:user_id>")

# api.add_resource(BanksByDistanceAPI, "/banks?lati=<float:lati>&longi=<float:longi>&radius=<float:radius>")
# api.add_resource(BanksByStateAndCity, "/banks?state=<string:state>&city=<string:city>")
api.add_resource(BankListAPI, "/banks")
api.add_resource(BankAPI, "/banks/<int:bank_id>")

api.add_resource(AllBloodBagsAPI, "/bags")
api.add_resource(BloodBagsByBankAPI, "/banks/<int:bank_id>/bags")
api.add_resource(BloodBagsByBankAndGroupAPI, "/banks/<int:bank_id>/groups/<int:group>/bags")

api.add_resource(DonationsByUserAPI, "/users/<int:user_id>/donations")

# api.add_resource(CitiesByStateAPI, "/cities")


@app.route('/')
def hello_world():
    return '<body><h1>Hello World!</h1></body>'


db.init_app(app)
ma.init_app(app)
bcrypt.init_app(app)

from models import user, blood_bank, bag_size, blood_bag, donation, state, city, notification
# from models.blood_bank import BloodBank

if __name__ == '__main__':
    app.run(debug=True)
