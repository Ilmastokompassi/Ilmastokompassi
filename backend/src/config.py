"""Default configuration meant to be overridden by environment variables."""
from os import environ

class EnvironmentConfig:
    TESTING = False
    DEVELOPMENT = environ.get("ENVIRONMENT") == "development"
    DATABASE_URL = environ.get("DATABASE_URL")
    SECRET_KEY = environ.get("SECRET_KEY")
