from flask import Blueprint, jsonify, request
import json
from datetime import datetime
from sqlalchemy import inspect
from ..tables.user_table import Users
from ..tables.public_games import PublicGames




# home endpoint

api = Blueprint('api', __name__)

@api.route('/', methods=["GET"])
def foo():
    return jsonify('public_games')

@api.route('/public_games', methods=["GET", "POST", "DELETE"])
def public_game():
    """ End point to add, remove, view public games which are 
        currently avaiable to join. 

        POST:
            -- parameters (json), 200:
              "host_name": string, name of location or host
              "is_open": boolean, true if game is open to public
            -- return (json), 200:
              "host_name": string, name of location or host
              "is_open": boolean, true if game is open to public
              "creation_time": string, datetime of game creation
              "id": game id, auto incriments on table
            -- return json(Exemption), 500:
              "Exemption": error message / exepmtion 
        GET:
            -- parameters:
              NONE
            -- return (json, list), 200:
              "host_name": string, name of location or host
              "is_open": boolean, true if game is open to public
              "creation_time": string, datetime of game creation
              "id": game id, auto incriments on table
            -- return json(Exemption), 500:
              "Exemption": error message / exepmtion 
        DELETE: 
            -- parameters (json):
              "id": int or string, table id of game to delete
            -- return json, 200:
              "id"
            -- return json(Exemption), 500:
               "Exemption": error message / exepmtion          
    """
    
    if request.method == 'GET':

        try:
            all_games = PublicGames.getAll()
            all_g = []
            for u in all_games:
                dictret = dict(u.__dict__)
                dictret.pop('_sa_instance_state', None)
                all_g.append(dictret)
            return jsonify(all_g), 200
        except Exception as e:
            return jsonify({"Exemption": str(e)}), 500

    elif request.method == 'POST':
        data = request.json
        host_name = data["host_name"]
        is_open = bool(data["is_open"])
        creation_time = datetime.now()
        new_game = PublicGames(host_name=host_name, 
                               is_open=is_open, creation_time=creation_time)
        try:
            _id = PublicGames.post(new_game)._id
            return_game = {"host_name": host_name,
                           "is_open": is_open,
                           "creation_time": creation_time,
                           "id": _id }
            return jsonify(return_game), 200
        except Exception as e:
            return jsonify({"Exemption": str(e)}), 500
    
    elif request.method == 'DELETE':
        data = request.json
        _id = int(data["id"])
        try:
            PublicGames.delete(_id)
            return jsonify(_id), 200
        except Exception as e:
            return jsonify({"Exemption": str(e)}), 500
