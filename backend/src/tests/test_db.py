import unittest
import pytest
from .config import TestConfig
from src import create_app
from src.extensions import db

class TestDb(unittest.TestCase):
    def setUp(self):
        self.app = create_app(TestConfig)
        self.client = self.app.test_client()

        with self.app.app_context():
            db.create_all()