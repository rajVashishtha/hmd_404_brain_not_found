import json
from flask import request
from flask_restful import Resource

from models.state import State
from models.city import City

STATE_DOES_NOT_EXIST = "State with given name does not exist."
PROVIDE_STATE_NAME_PARAM = "state_name query param not provided."


class CitiesByStateAPI(Resource):

    @classmethod
    def get(cls):
        req = request.args

        if 'name' in req:
            state = State.find_by_name(name=req['name'])
            if not state:
                return {"message": STATE_DOES_NOT_EXIST}
            cities = json.dumps(state.cities.all())
        else:
            return {"message": PROVIDE_STATE_NAME_PARAM}

        return {"cities": cities}, 200
