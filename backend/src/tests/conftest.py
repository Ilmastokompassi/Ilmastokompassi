"""This module contains fixtures for the tests."""
import pytest
from src.app import create_app


@pytest.fixture(scope='module')
def app():
    return create_app()


@pytest.fixture(scope='module')
def client(app):
    return app.test_client()
