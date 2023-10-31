import unittest
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from src.extensions import db
from src.repositories.group_repository import GroupRepository


class TestGroupRepository(unittest.TestCase):

    def setUp(self):
        engine = create_engine('sqlite:///:memory:')
        Session = sessionmaker(bind=engine)
        self.session = Session()
        db.session = self.session
        with engine.connect() as conn:
            conn.execute(text('''
                CREATE TABLE groups (
                    token TEXT PRIMARY KEY
                )
            '''))
            conn.execute(text('''
                CREATE TABLE responses (
                    id SERIAL PRIMARY KEY,
                    group_token TEXT REFERENCES groups(token)
                )
            '''))

        self.group_repository = GroupRepository()

    def tearDown(self):
        db.session.close()

    def test_save_group(self):
        self.group_repository.save_group("test_token")
        result = self.group_repository.check_if_group_exists("test_token")
        self.assertTrue(result)

    def test_check_if_group_exists(self):
        self.group_repository.save_group("test_token")
        result = self.group_repository.check_if_group_exists("test_token")
        self.assertTrue(result)

    def test_check_if_group_exists_not(self):
        result = self.group_repository.check_if_group_exists("test_token")
        self.assertFalse(result)

    def test_insert_group_token_to_responses(self):
        token = "test_token"
        response_id = 1
        insert_sql = text("INSERT INTO responses (id) VALUES (:response_id)")
        db.session.execute(insert_sql, {"response_id": response_id})
        self.group_repository.insert_group_token_to_responses(
            token, response_id)
        sql = text("SELECT * FROM responses WHERE id = :response_id")
        result = db.session.execute(
            sql, {"response_id": response_id}).fetchall()
        self.assertEqual(result, [(response_id, token)])
