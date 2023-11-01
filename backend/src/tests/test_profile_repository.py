import unittest
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from src.extensions import db
from src.repositories.profile_repository import ProfileRepository


class TestProfileRepository(unittest.TestCase):
    def setUp(self):
        engine = create_engine('sqlite:///:memory:')
        Session = sessionmaker(bind=engine)
        self.session = Session()
        db.session = self.session
        with engine.connect() as conn:
            conn.execute(text('''
                CREATE TABLE profiles (
                    id INTEGER PRIMARY KEY,
                    name TEXT,
                    description TEXT
                )
            '''))
        self.profile_repository = ProfileRepository()

    def tearDown(self):
        db.session.close()

    def test_get_profiles(self):
        self.session.execute(
            text("INSERT INTO profiles (name, description) VALUES ('Test Profile', 'Test Description');"))
        self.session.commit()
        profiles = self.profile_repository.get_profiles()
        self.assertEqual(len(profiles), 1)
        self.assertEqual(profiles[0]['name'], 'Test Profile')
        self.assertEqual(profiles[0]['description'], 'Test Description')
