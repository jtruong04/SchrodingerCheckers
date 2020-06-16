from flask import Blueprint, jsonify, request
from ..tables.user_table import Users
from ..tables.games_table import Games
from . import salt_me

# User endpoint

user = Blueprint('user', __name__)


@user.route('/', methods=["GET"])
def get_users(**path_variables):
    return jsonify({'users': 'Jim'}), 200


@user.route('/<string:id>', methods=['GET'])
def user_profile(id):
    error = None
    user_profile = Users.get().filter(Users.usr_name == id)[0]
    user_wins = Games.count().filter(Games.winner == id)[0]
    user_loss = Games.count().filter(Games.loser == id)[0]
    # TODO: finish this method
    return 0
