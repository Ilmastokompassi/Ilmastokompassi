from flask import Flask
from flask_cors import CORS
from .config import config

# Create the Flask app using the app factory pattern
def create_app(environment):
    app = Flask(__name__)
    CORS(app)

    # Apply configuration
    app.config.from_object(config.get(environment or "Development"))

    # Import routes
    with app.app_context():
        from . import routes # pylint: disable=import-outside-toplevel, unused-import, wrong-import-position # nopep8

    return app
