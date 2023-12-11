"""Default configuration meant to be overridden by environment variables."""
from os import environ


class EnvironmentConfig:
    TESTING = False
    ENVIRONMENT = environ.get("ENVIRONMENT")
    SQLALCHEMY_DATABASE_URI = environ.get("DATABASE_URI")
    SECRET_KEY = environ.get("SECRET_KEY")
    BASE_URL = environ.get("BASE_URL")
