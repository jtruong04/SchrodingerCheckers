from passlib.hash import sha256_crypt

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

# Initialize all of the blueprints
from .user import user as user
from .home import home as home
from .api_endpoint import api as api

def api_init(app):
    app.register_blueprint(user,
                           url_prefix='/user')
    app.register_blueprint(home,
                           url_prefix='/')
    app.register_blueprint(api,
                           url_prefix='/api')
