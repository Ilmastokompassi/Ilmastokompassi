"""Configuration meant to be used by tests."""

class TestConfig:
    TESTING = True
    DEVELOPMENT = False
    SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:"
    SECRET_KEY = "secret"
