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

@api.route('/games', methods=["GET", "POST"])
def public_game():
  """ End point connection to public games table. 
      GET returns all games POST adds a new game.

      POST:
          -- parameters (json), 200:
            "host_name": string, name of location or host
            "is_open": boolean 0 1, true if game is open to public
          -- return (json), 200:
            "host_name": string, name of location or host
            "is_open": boolean, true if game is open to public
            "creation_time": string, datetime of game creation
            "id": game id, auto increments on table
          -- return json(Exception), 500:
            "Exception": error message / exception 
      GET:
          -- parameters:
            NONE
          -- return (json, list), 200:
            "host_name": string, name of location or host
            "is_open": boolean 0 1, true if game is open to public
            "creation_time": string, datetime of game creation
            "id": game id, auto increments on table
          -- return json(Exception), 500:
            "Exception": error message / exception 
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
          return jsonify({"Exception": str(e)}), 500

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
          return jsonify({"Exception": str(e)}), 500

@api.route('/games/<int:id>', methods=["PATCH"])
def game_patch(id):
  """ End point connection to public games table. 
      Update a game
        PATCH:
            -- parameters (json):
              "id": int or string, table id of game to update
              "is_open": boolean 0 1, as string or int 
            -- return (json, list), 200:
              "host_name": string, name of location or host
              "is_open": boolean 0 1, true if game is open to public
              "creation_time": string, datetime of game creation
              "id": game id, auto increments on table
            -- return json(Exception), 500:
              "Exception": error message / exception            
    """
  _id = id
  data = request.json
  is_open = bool(data["is_open"])
  try:
    game = PublicGames.patch(_id, {'is_open': is_open})
    return_game = {"host_name": game.host_name,
                      "is_open": game.is_open,
                      "creation_time": game.creation_time,
                      "id": game._id }
    return jsonify(return_game), 200
  except Exception as e:
    return jsonify({"Exception": str(e)}), 500

@api.route('/games/<int:id>/DELETE', methods=["DELETE"])
def game_delete(id):
  """ End point connection to public games table. 
        DELETE a game
        DELETE: 
            -- parameters (json):
              "id": int or string, table id of game to delete
            -- return json, 200:
              "id"
            -- return json(Exemption), 500:
               "Exception": error message / exception                     
    """

  _id = id
  try:
      PublicGames.delete(_id)
      return jsonify(_id), 200
  except Exception as e:
      return jsonify({"Exception": str(e)}), 500


