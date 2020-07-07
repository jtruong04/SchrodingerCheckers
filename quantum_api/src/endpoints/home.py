from flask import Blueprint, jsonify, request


# home endpoint

home = Blueprint('home', __name__)


@home.route('/', methods=["GET", "POST"])
# This is the homepage
def foo():

    return jsonify('Welcome home'), 200
