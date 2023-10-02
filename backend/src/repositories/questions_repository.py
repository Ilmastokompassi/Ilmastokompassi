from sqlalchemy import text
from src.extensions import db


class QuestionsRepository:
    # pylint: disable=too-few-public-methods

    def get_questions(self):
        result = db.session.execute(
            text("SELECT * FROM questions;")).mappings().all()
        questions = [dict(row) for row in result]
        return questions


default_questions_repository = QuestionsRepository()
