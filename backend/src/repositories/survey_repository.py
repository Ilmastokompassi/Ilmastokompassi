from sqlalchemy import text
from src.extensions import db


class SurveyRepository:
    def get_questions(self):
        result = db.session.execute(
            text("SELECT id, content FROM profile_questions;")).mappings().all()
        questions = [dict(row) for row in result]
        return questions

    def save_answers(self, answers):
        try:
            sql = text("INSERT INTO responses VALUES (default) RETURNING id")
            response_id = db.session.execute(sql).fetchone()[0]
            for question_id, answer in answers.items():
                db.session.execute(text("""
                    INSERT INTO profile_answers (response_id, question_id, score)
                        VALUES (:response_id, :question_id, :score)"""),
                                   {"response_id": response_id, "question_id": question_id, "score": answer})  # pylint: disable=line-too-long
        except Exception as error:
            db.session.rollback()
            raise error

        db.session.commit()
        return response_id

    def get_response_answers(self, response_id):
        sql = text("""SELECT score, Q.profile_id FROM profile_answers
                        JOIN profile_questions Q on question_id=Q.id
                   WHERE response_id=:response_id;
                   """)
        return db.session.execute(sql, {"response_id": response_id}).fetchall()

    def get_answer_count(self, response_id):
        result = db.session.execute(
            text("SELECT COUNT(*) FROM profile_answers WHERE response_id = :response_id"),
            {"response_id": response_id}).fetchone()[0]
        return result


default_survey_repository = SurveyRepository()
