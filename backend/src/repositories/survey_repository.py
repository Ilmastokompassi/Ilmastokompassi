from sqlalchemy import text
from src.extensions import db


class SurveyRepository:
    # pylint: disable=too-few-public-methods

    def get_questions(self):
        result = db.session.execute(
            text("SELECT * FROM questions;")).mappings().all()
        questions = [dict(row) for row in result]
        return questions

    def save_answers(self, answers):
        try:
            sql = text("INSERT INTO users VALUES (default) RETURNING id")
            user_id = db.session.execute(sql).fetchone()[0]
            for question_id, answer in answers.items():
                db.session.execute(text("""
                    INSERT INTO answers (user_id, question_id, score)
                        VALUES (:user_id, :question_id, :score)"""),
                                   {"user_id": user_id, "question_id": question_id, "score": answer})  # pylint: disable=line-too-long
        except Exception as error:  # pylint: disable=broad-except
            db.session.rollback()
            raise error

        db.session.commit()
        return user_id

    def get_answer_count(self, user_id):
        result = db.session.execute(
            text("SELECT COUNT(*) FROM answers WHERE user_id = :user_id"),
            {"user_id": user_id}).fetchone()[0]
        return result


default_survey_repository = SurveyRepository()
