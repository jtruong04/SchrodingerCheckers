from flask import Flask, request, render_template, jsonify
from flask_restful import Resource, Api
from markupsafe import escape
from sqlalchemy import Column, create_engine, VARCHAR, ForeignKey
import urllib.parse
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship

Base = declarative_base()


class LoginTable(Base):
    __tablename__ = 'login'
    usr_name = Column(VARCHAR(length=255), primary_key=True)
    pwd = Column(VARCHAR(length=255))

class UserInfoTable(Base):
    __tablename__ = 'user_information'
    usr_name = Column(VARCHAR, ForeignKey('login.usr_name'), primary_key=True)
    First_Name = Column(VARCHAR)
    Last_Name = Column(VARCHAR)
    email = Column(VARCHAR)
    location = Column(VARCHAR)



if __name__ == '__main__':
    '''
    Test Routine
    '''
    # Set up SQL Alchemy Engine and ORM
    sql_user = 'root'
    sql_pwd = urllib.parse.quote_plus("QuantumCAT2020?")
    engine = create_engine(('mysql://'
                            + sql_user + ':' + sql_pwd
                            + '@173.64.3.20:3306/QuantumCatDummy'))
    session = sessionmaker()
    session.configure(bind=engine)
    Base.metadata.create_all(engine)
    sess = session()

    # Initiate Flask
    app = Flask(__name__)
    app.config["DEBUG"] = True


    @app.route('/home', methods=['GET'])
    def home():
        user_info = sess.query(LoginTable)
        user_info = user_info.filter(LoginTable.usr_name == 'john')[0].pwd

        return user_info


    @app.route('/ApiTest', methods=['GET'])
    def check_pwd(input_user, input_pass):
        user_info = sess.query(LoginTable)
        return user_info.select([pwd]).where(LoginTable.usr_name == request.GET[input_user])

    @app.route('/user/<id>', methods=['GET'])
    def user_profile(id):
        user_profile = sess.query(UserInfoTable)
        user_profile = user_profile.filter(UserInfoTable.usr_name == id)[0]

        return user_profile


    app.run()
