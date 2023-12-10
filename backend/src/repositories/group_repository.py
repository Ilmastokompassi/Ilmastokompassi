from sqlalchemy import text
from src.extensions import db


class GroupRepository:

    def save_group(self, token):
        try:
            sql = text("INSERT INTO groups (token) VALUES (:token)")
            db.session.execute(sql, {"token": token})
        except Exception as error:
            db.session.rollback()
            raise error

        db.session.commit()

    def check_if_group_exists(self, token):
        sql = text("SELECT * FROM groups WHERE token = :token")
        result = db.session.execute(sql, {"token": token}).fetchone()
        return result is not None

    def insert_group_token_to_responses(self, token, response_id):
        try:
            sql = text(
                "UPDATE responses SET group_token = :token WHERE id = :response_id")
            db.session.execute(
                sql, {"token": token, "response_id": response_id})
        except Exception as error:
            db.session.rollback()
            raise error

        db.session.commit()

    def fetch_scores_by_group(self, token):
        sql = text(
            """SELECT
                    score, profile_id, responses.id 
                FROM 
                    responses, profile_answers, profile_questions 
                WHERE 
                    responses.id = profile_answers.response_id AND 
                    profile_answers.question_id=profile_questions.id AND 
                    responses.group_token = :token
                """)
        score = db.session.execute(
            sql, {"token": token}).fetchall()
        return score


default_group_repository = GroupRepository()
