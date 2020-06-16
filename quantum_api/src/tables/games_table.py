# users table
from sqlalchemy import VARCHAR, INT
from .base_table import base_table, db


class Games(db.Model, base_table):
    """[summary]

    Args:
        db ([type]): [description]
        base_table ([type]): [description]
    """
    __tablename__ = 'games'
    index = db.Column(INT, primary_key=True)
    winner = db.Column(VARCHAR(100))
    loser = db.Column(VARCHAR(100))
    w_moves = db.Column(INT)
    l_moves = db.Column(INT)
    time = db.Column(INT)
