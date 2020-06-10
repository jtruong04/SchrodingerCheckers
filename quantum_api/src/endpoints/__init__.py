# Initialize all of the blueprints
from .user import user

def api_init(app):
    app.register_blueprint(user,
        url_prefix='/api/v1/user')