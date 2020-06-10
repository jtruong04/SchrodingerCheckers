#base table
from flask_sqlalchemy import SQLAlchemy
import src
# from flask import current_app

class testClass():
    def __init__(self):
        self.test = src.test

test = testClass()
print(test.test)
db = src.db
class base_table():
    pass

    @classmethod
    def get(cls):
        # session = db.session
        # query = session.query(cls)
        pass
    @classmethod
    def getAll(cls):
        pass
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
    
    