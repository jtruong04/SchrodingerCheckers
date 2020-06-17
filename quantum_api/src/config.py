import os
import urllib.parse
# from dotenv import load_dotenv
basedir = os.path.abspath(os.path.dirname(__file__))

class Config():
    DEBUG = False
    TESTING = False
    sql_user = 'root'
    sql_pwd = urllib.parse.quote_plus("QuantumCAT2020?")

    SQLALCHEMY_DATABASE_URI = ('mysql+pymysql://' + sql_user + ':'
                               + "QuantumCAT2020?"
                               + '@173.64.3.20:3306/QuantumCat')
    #SECRET_KEY = ('8n\xbd\n\x91\xa8\x83\x95\xd2\xd8\xd7'
    #              + '\xe2\xe8"\xef(\xde\x81\x8e9\xc1h\xcc\xd4')
    SECRET_KEY = os.getenv('SECRET_KEY', 'my_precious')

class devConfig(Config):
    DEBUG = True
    TESTING = False

class prodConfig(Config):
#   overwrite to prod DB link
    pass