# users table
import jwt
import datetime
from sqlalchemy import VARCHAR, INT, FLOAT
from .base_table import base_table, db
from src import flaskApp as flaskApp


class Users(db.Model, base_table):
    """[summary]

    Args:
        db ([type]): [description]
        base_table ([type]): [description]
    """

    __tablename__ = 'users'
    usr_name = db.Column(VARCHAR(100), primary_key=True)
    first_name = db.Column(VARCHAR(100))
    last_name = db.Column(VARCHAR(100))
    email = db.Column(VARCHAR(100))
    location = db.Column(VARCHAR(100))
    pwd = db.Column(VARCHAR(100))
    rank = db.Column(INT)
    ilo = db.Column(FLOAT)

    def encode_auth_token(self, user_id):
        """
        Generates the Auth Token
        :return: string
        """
        try:
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, seconds=5),
                'iat': datetime.datetime.utcnow(),
                'sub': user_id
            }
            return jwt.encode(
                payload,
                flaskApp.config.get('SECRET_KEY'),
                algorithm='HS256'
            )
        except Exception as e:
            return e


    @staticmethod
    def decode_auth_token(auth_token):
        """
        Decodes the auth token
        :param auth_token:
        :return: integer|string
        """
        try:
            payload = jwt.decode(auth_token, app.config.get('SECRET_KEY'))
            return payload['sub']
        except jwt.ExpiredSignatureError:
            return 'Signature expired. Please log in again.'
        except jwt.InvalidTokenError:
            return 'Invalid token. Please log in again.'
