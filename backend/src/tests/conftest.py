import pytest
from .config import TestConfig
from src.app import create_app


@pytest.fixture(scope='module')
def app():
    app = create_app(TestConfig)
    return app


@pytest.fixture(scope='module')
def client(app):
    return app.test_client()
