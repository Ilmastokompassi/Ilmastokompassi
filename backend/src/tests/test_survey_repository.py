import unittest
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from src.extensions import db
from src.repositories.survey_repository import SurveyRepository


class TestSurveyRepository(unittest.TestCase):
    def setUp(self):
        engine = create_engine('sqlite:///:memory:')
        Session = sessionmaker(bind=engine)
        self.session = Session()
        db.session = self.session
        with engine.connect() as conn:
            conn.execute(text('''
                CREATE TABLE responses (
                    id SERIAL PRIMARY KEY
                )'''))
            conn.execute(text('''
                CREATE TABLE profiles (
                    id SERIAL PRIMARY KEY,
                    name TEXT,
                    description TEXT
                )'''))
            conn.execute(text('''
                CREATE TABLE profile_questions (
                    id SERIAL PRIMARY KEY,
                    content TEXT,
                    profile_id INTEGER REFERENCES profiles(id)
                )'''))
            conn.execute(text('''
                CREATE TABLE profile_answers (
                    id SERIAL PRIMARY KEY,
                    response_id INTEGER REFERENCES responses(id),
                    question_id INTEGER REFERENCES profile_questions(id),
                    score INTEGER
                )'''))
        self.repo = SurveyRepository()

    def test_get_all_questions_empty(self):
        surveys = self.repo.get_questions()
        self.assertEqual(len(surveys), 0)

    def test_answer_count(self):
        self.session.execute(text("INSERT INTO responses VALUES (1)"))
        self.session.execute(
            text("INSERT INTO profile_answers VALUES (1, 1, 1, 100)"))
        answer_count = self.repo.get_answer_count(1)
        self.assertEqual(answer_count, 1)
