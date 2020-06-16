from src import flaskApp as flaskApp
# flask server startup

if __name__ == '__main__':
    flaskApp.run(debug=True, host="0.0.0.0", port=5000)