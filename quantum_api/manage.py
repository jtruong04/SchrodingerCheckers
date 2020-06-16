from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from src import flaskApp, db

migrate = Migrate(flaskApp, db)
manager = Manager(flaskApp)

manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()
