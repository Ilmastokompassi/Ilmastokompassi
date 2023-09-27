from flask import Flask
from flask_cors import CORS
from src.extensions import db

# Create the Flask app using the app factory pattern
def create_app(config):
    app = Flask(__name__)

    # Enable CORS
    CORS(app)

    # Apply configuration
    app.config.from_object(config)

    # Initialize extensions
    db.init_app(app)

    # Import routes
    with app.app_context():
        from . import routes # pylint: disable=import-outside-toplevel, unused-import, wrong-import-position # nopep8

    return app
