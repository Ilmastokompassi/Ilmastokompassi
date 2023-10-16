from sqlalchemy import text
from src.extensions import db


class GroupRepository:
    # pylint: disable=too-few-public-methods

    def save_group(self, token):
        try:
            sql = text("INSERT INTO groups (token) VALUES (:token)")
            db.session.execute(sql, {"token": token})
        except Exception as error:  # pylint: disable=broad-except
            db.session.rollback()
            raise error

        db.session.commit()

    def check_if_group_exists(self, token):
        try:
            sql = text("SELECT * FROM groups WHERE token = :token")
            result = db.session.execute(sql, {"token": token}).fetchone()
            return result is not None
        except Exception as error:
            raise error

    def insert_group_token_to_users(self, token, user_id):
        try:
            sql = text(
                "UPDATE users SET group_token = :token WHERE id = :user_id")
            db.session.execute(
                sql, {"token": token, "user_id": user_id})

        except Exception as error:
            db.session.rollback()
            raise error

        db.session.commit()


default_group_repository = GroupRepository()
