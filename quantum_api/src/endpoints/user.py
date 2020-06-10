# User endpoint
from flask import Blueprint,jsonify,request
from ..tables.user_table import User

user = Blueprint('User',__name__)

@user.route('/',methods=["GET"])
def get_users(**path_variables):
    return jsonify({'users':'Jim'}), 200