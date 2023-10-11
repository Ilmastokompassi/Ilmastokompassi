from flask import Flask
from flask_cors import CORS
from src.extensions import db
from src.config import EnvironmentConfig
from src.api import api


# Create the Flask app using the app factory pattern
def create_app(config=EnvironmentConfig):
    _app = Flask(__name__)

    # Enable CORS
    CORS(_app)

    # Apply configuration
    _app.config.from_object(config)

    # Initialize extensions
    db.init_app(_app)

    # Import routes
    _app.register_blueprint(api)

    return _app


if __name__ == "__main__":
    app = create_app(EnvironmentConfig)
    app.run(host="0.0.0.0")
