from flask import Blueprint, jsonify, request
from ..tables.user_table import Users
from ..tables.public_games import PublicGames


# home endpoint

api = Blueprint('api', __name__)

@api.route('/public_games', methods=["GET", "POST"])
def public_game():
    
    all_games = PublicGames.getAll().get_json()

    return jsonify(all_games), 200