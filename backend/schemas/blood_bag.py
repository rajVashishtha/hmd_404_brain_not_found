from ma import ma
from models.blood_bag import BloodBag
from marshmallow import post_load, fields
from marshmallow.utils import EXCLUDE


class BloodBagSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = BloodBag
        # load_only = ()
        dump_only = ("id", "blood_bank_id")
        include_fk = True
        unknown = EXCLUDE

    bag_size_id = fields.Int(required=True)
    # bank_id = fields.Int(dump_only=True)

    @post_load
    def make_blood_bag(self, data, **kwargs):
        return BloodBag(**data)

