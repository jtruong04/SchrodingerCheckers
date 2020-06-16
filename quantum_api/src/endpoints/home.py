from flask import Blueprint, jsonify, request
from ..tables.user_table import Users
from ..tables.games_table import Games
from . import salt_me
from ..tables.user_table import Users

# User endpoint

home = Blueprint('home', __name__)


@home.route('/', methods=["GET", "POST"])
# This is the homepage
def foo():
    return jsonify('Welcome home'), 200


@home.route('/register', methods=["GET", "POST"])
# TODO: check that username is unique
def register():
    error = None
    if request.method == 'POST':

        # this might change depending on how the front end is written
        user_name = request.form['username']
        password = salt_me(request.form['password'])

        email = request.form['email']
        loc = request.form['location']
        fname = request.form['fname']
        lname = request.form['lname']

        rank = None
        # TODO: I do not know what ilo score starts at
        # It's Elo and it's whatever we want to start at. Chess uses 1200 or so I think. Because people don't like negative numbers. I'm choosing 1000.
        # Get educated: https://en.wikipedia.org/wiki/Elo_rating_system
        ilo = 1000

        new_user = Users(usr_name=user_name, email=email, first_name=fname,
                         last_name=lname, location=loc, pwd=password,
                         rank=rank, ilo=ilo)
        added = Users.post(new_user)
        return added
