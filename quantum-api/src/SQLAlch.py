from flask import Flask, request, render_template, jsonify
from flask_restful import Resource, Api
from markupsafe import escape
from sqlalchemy import Column, create_engine, VARCHAR
import urllib.parse
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()


class Users(Base):
    __tablename__ = 'users'
    usr_name = Column(VARCHAR(length=255), primary_key=True)
    pwd = Column(VARCHAR(length=255))


if __name__ == '__main__':
    '''
    Test Routine
    '''
    # Set up SQL Alchemy Engine and ORM
    sql_user = 'root'
    sql_pwd = urllib.parse.quote_plus("QuantumCAT2020?")
    engine = create_engine(('mysql://'
                            + sql_user + ':' + sql_pwd
                            + '@maybegames.dev:3306/QuantumCatDummy'))
    session = sessionmaker()
    session.configure(bind=engine)
    Base.metadata.create_all(engine)
    sess = session()

    # Initiate Flask
    app = Flask(__name__)
    app.config["DEBUG"] = True


    @app.route('/home', methods=['GET'])
    def home():
        user_info = sess.query(Users)
        user_info = user_info.filter(Users.usr_name == 'John')[0].pwd

        return user_info


    @app.route('/ApiTest', methods=['GET'])
    def check_pwd(input_user, input_pass):
        user_info = sess.query(Users)
        return user_info.select([pwd]).where(Users.usr_name == request.GET[input_user])

    app.run()
