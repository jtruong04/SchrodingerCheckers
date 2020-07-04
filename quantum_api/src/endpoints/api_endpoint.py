from flask import Blueprint, jsonify, request
import json
from ..tables.user_table import Users
from ..tables.public_games import PublicGames



# home endpoint

api = Blueprint('api', __name__)

@api.route('/', methods=["GET"])
def foo():
    return jsonify('public_games')

@api.route('/public_games', methods=["GET", "POST", "DELETE"])
def public_game():
    if request.method == 'GET':
        all_games = PublicGames.getAll()
        all_g = []
        for u in all_games:
            dictret = dict(u.__dict__)
            dictret.pop('_sa_instance_state', None)
            all_g.append(dictret)
        return jsonify(all_g), 200

    elif request.method == 'POST':
        data = request.json
        host_name = data["host_name"]
        is_open = bool(data["is_open"])
        creation_time = data["creation_time"]
        new_game = PublicGames(host_name=host_name, 
                               is_open=is_open, creation_time=creation_time)
        try:
            PublicGames.post(new_game)
            return jsonify('Game Added'), 200
        except:
            return jsonify('Could not update game list'), 400
    
    elif request.method == 'DELETE':
        data = request.json
        _id = int(data["id"])
        try:
            PublicGames.delete(_id)
            return jsonify("game deleted"), 200
        except:
            return jsonify("could not delete game"), 400
