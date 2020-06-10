# user table
from sqlalchemy import Column, create_engine, VARCHAR, ForeignKey, INT
from .base_table import base_table,db


class User(db.Model,base_table):
    """ Main table which contains user data.
    Arguments:
        Base {declarative_base} -- SQLAlchemy base
    """
    __tablename__ = 'user_information'
    usr_name = db.Column(VARCHAR(100), primary_key=True)
    first_name = db.Column(VARCHAR(100))
    last_name = db.Column(VARCHAR(100))
    email = db.Column(VARCHAR(100))
    location = db.Column(VARCHAR(100))
    pwd = db.Column(VARCHAR(100))
    rank = db.Column(INT)
    test = db.Column(INT)