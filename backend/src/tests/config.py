"""Configuration meant to be used by tests."""

class TestConfig:
    TESTING = True
    DEVELOPMENT = False
    DATABASE_URL = "sqlite:///:memory:"
    SECRET_KEY = "secret"
