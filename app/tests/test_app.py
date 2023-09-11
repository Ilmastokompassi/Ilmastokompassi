import unittest
from flask import Flask
from app import app

class TestApp(unittest.TestCase):

    def setUp(self):
        # Create a test client using the Flask app
        app.config['TESTING'] = True
        self.client = app.test_client()

    def test_index_route(self):
        # Test the index route
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, b'Hello world!')

