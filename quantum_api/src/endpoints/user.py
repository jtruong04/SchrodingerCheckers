from flask import Blueprint, jsonify, request
from ..tables.user_table import Users
from ..tables.games_table import Games
from . import salt_me, verify_password

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

@user.route('/register', methods=["GET", "POST"])
def register():
    if request.method == 'POST':

        # required fields
        user_name = request.form.get('username')
        password = salt_me(request.form.get('password'))
        email = request.form.get('email')
        # optinal fields
        loc = request.form.get('location')
        fname = request.form.get('fname')
        lname = request.form.get('lname')

        rank = None
        # TODO: I do not know what ilo score starts at
        ilo = 1000

        # check if required fields are populated
        if (user_name is None) or (email is None) or (password is None):
            return jsonify({'msg': 'Please enter all required fields'}), 400

        # check if user exits
        if Users.get(user_name):
            return jsonify({'msg': 'username already taken'}), 400

        new_user = Users(usr_name=user_name, email=email, first_name=fname,
                         last_name=lname, location=loc, pwd=password,
                         rank=rank, ilo=ilo)
        Users.post(new_user)
        return jsonify({'msg': 'Account Created'}), 200


@user.route('/login', methods=["GET", "POST"])
def login():
    if request.method == 'POST':

        msg = ('user does not exist or password is incorrect')

        # required fields
        user_name = request.form.get('username')
        password = request.form.get('password')

        # check that a username and password were entered
        if (user_name is None) or (password is None):
            return jsonify({'msg': 'Please enter username and password'}), 400

        # check that user exists
        if not Users.get(user_name):
            return jsonify({'msg': msg}), 400


        #check password
        pwd_db = Users.get(user_name).pwd
        if verify_password(password, pwd_db):
            user = Users.query.filter_by(usr_name=user_name).first()
            auth_token = user.encode_auth_token(user_id=user_name)
            print(auth_token)
            obj = {'msg': 'Logged in',
                   'token': str(auth_token),
                   'user' : {'username': user_name, 'email': Users.get(user_name).email}
                   }
            return jsonify(obj), 200
        else:
            return jsonify({'msg': msg}), 400
