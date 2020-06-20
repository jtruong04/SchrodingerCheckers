from sqlalchemy import VARCHAR, INT, BOOLEAN, DATETIME
from .base_table import base_table, db


class PublicGames(db.Model, base_table):
    """[summary]

    Args:
        db ([type]): [description]
        base_table ([type]): [description]
    """
    __tablename__ = 'public_games'
    _id = db.Column(INT, primary_key=True)
    host_name = db.Column(VARCHAR(100))
    is_open = db.Column(BOOLEAN)
    creation_time = db.Column(DATETIME)
