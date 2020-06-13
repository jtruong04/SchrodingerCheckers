# base table
import src
# from flask import current_app

db = src.db


class base_table():

    @classmethod
    def get(cls, target):
        """ Method which returns the instance where primary key == target

        Args:
            target (flexible): primary key of target information.
        Return:
            Database column associated with primary key, if exists, else None.
        """
        session = db.session
        query = session.query(cls)
        return query.get(target)

    @classmethod
    def getAll(cls):
        """ Method which returns all elements of database table
        Returns:
            All entries in table
        """
        session = db.session
        query = session.query(cls)
        return query

    @classmethod
    def post(cls):
        pass

    @classmethod
    def patch(cls):
        pass

    @classmethod
    def delete(cls):
        pass

    @classmethod
    def count(cls):
        pass
