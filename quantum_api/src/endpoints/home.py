from flask import Blueprint, jsonify, request
from ..tables.user_table import Users
from ..tables.games_table import Games

# home endpoint

home = Blueprint('home', __name__)


@home.route('/', methods=["GET", "POST"])
# This is the homepage
def foo():
    return jsonify('Welcome home'), 200
