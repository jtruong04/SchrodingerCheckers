from flask import Flask, request, render_template, jsonify, url_for
from flask import redirect
from flask_restful import Resource, Api
from markupsafe import escape
from sqlalchemy import Column, create_engine, VARCHAR, ForeignKey, INT
import urllib.parse
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from passlib.hash import sha256_crypt
from dataclasses import dataclass


# Set up SQL Alchemy Engine and ORM
sql_user = 'root'
sql_pwd = urllib.parse.quote_plus("QuantumCAT2020?")
engine = create_engine(('mysql://'
                        + sql_user + ':' + sql_pwd
                        + '@173.64.3.20:3306/QuantumCatDummy'))
Session = sessionmaker()
Session.configure(bind=engine)
Base = declarative_base()
Base.metadata.create_all(engine)
session = Session()


# Initiate Flask
app = Flask(__name__)
app.config["DEBUG"] = True



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




class User(Base):
    """ Main table which contains user data.
    Arguments:
        Base {declarative_base} -- SQLAlchemy base
    """
    __tablename__ = 'user_information'
    usr_name = Column(VARCHAR, primary_key=True)
    First_Name = Column(VARCHAR)
    Last_Name = Column(VARCHAR)
    email = Column(VARCHAR)
    location = Column(VARCHAR)
    pwd = Column(VARCHAR)

class Game(Base):
    """Table containing information on games played
    Arguments:
        Base {declarative_base} -- SQLAlchemy base
    """
    __tablename__ = 'game_table'
    index = Column(INT, primary_key=True)
    winner = Column(VARCHAR)
    loser =  Column(VARCHAR)
    w_moves = Column(INT)
    l_moves = Column(INT)
    time = Column(INT)


@app.route('/home', methods=['GET'])
def home():
    error = None
    return render_template('home.html', error=error)

@app.route('/user/<string:id>', methods=['GET'])
def user_profile(id):
    error = None
    user_profile = session.query(User)
    user_profile = user_profile.filter(User.usr_name == id).all()

    return jsonify({user_profile})

# Route for handling the login page logic
@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        usr =escape(request.form['username']) 
        pwd = request.form['password'] 
        user_info = session.query(User) 
        pwd_db = user_info.filter(User.usr_name == usr)[0].pwd
        if verify_password(pwd, pwd_db):
            return redirect(url_for('home'))
        else:
            error = 'Invalid Credentials. Please try again.'
    return render_template('login.html', error=error)
            
    

@app.route('/register', methods=['GET', 'POST'])
def register():
    error = None
    if request.method == 'POST':
        user_name = escape(request.form['username'])
        password = salt_me(request.form['password'])

        email = escape(request.form['email'])
        fname = escape(request.form['fname'])
        lname = escape(request.form['lname'])
        loc = esscape(request.form['loc'])
        new_user = User(usr_name=user_name, email=email, First_Name=fname,
                                    Last_Name=lname, location=loc, pwd=password)
        session.add(new_user)
        session.commit()
        return redirect(url_for('home'))

    return render_template('register.html', error=error)
    
if __name__ == '__main__':
    """ Test while things are getting going
    Returns:
    [type] -- [description]
    """
    app.run()
