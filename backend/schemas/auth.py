from ma import ma
from marshmallow import fields

class LoginSchema(ma.Schema):
    email = fields.Email(required=True)
    password = fields.Str(required=True)
    is_user = fields.Bool(required=True)


