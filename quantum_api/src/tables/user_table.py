# users table
from sqlalchemy import VARCHAR, INT, FLOAT
from .base_table import base_table, db


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
