from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from .config import devConfig

# Initiate Flask and SQLAlchemy with db
flaskApp = Flask(__name__)
flaskApp.config.from_object(devConfig)
flaskApp.config["DEBUG"] = True
flaskApp.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(flaskApp)

# initialize the api
from .endpoints import api_init
api_init(flaskApp)


@flaskApp.route('/', methods=["GET"])
def hello_word():
    return jsonify({'a': 'hi'}), 200
