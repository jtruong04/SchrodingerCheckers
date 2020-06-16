from flask import Blueprint, jsonify, request
from ..tables.user_table import Users
from ..tables.games_table import Games
from passlib.hash import sha256_crypt

# User endpoint

user = Blueprint('User', __name__)

def salt_me(pwd):
    """ Salts a password for upload to database

    Arguments:
        pwd {string} -- non-salted password supplied by user

    Returns:
        string -- password salted and encrypted
    """

    salted = sha256_crypt.encrypt(pwd)
    return salted


def verify_password(usr_given, from_db):
    """ routine to check if password supplied by user matches salted password in db.

    Arguments:
        usr_given {string} -- password supplied by user, raw.
        from_db {string} -- salted, and encrypted password from db

    Returns:
        boolean -- indicates if the two passwords match
    """

    return sha256_crypt.verify(usr_given, from_db)


@user.route('/', methods=["GET"])
def get_users(**path_variables):
    return jsonify({'users': 'Jim'}), 200


@user.route('/<string:id>', methods=['GET'])
def user_profile(id):
    error = None
    user_profile = Users.get().filter(Users.usr_name == id)[0]
    user_wins = Games.count().filter(Games.winner == id)[0]
    user_loss = Games.count().filter(Games.loser == id)[0]

    return jsonify(user_wins)
