from sqlalchemy import text
from src.extensions import db

class GroupRepository:
    # pylint: disable=too-few-public-methods

    def save_group(self, token):
        try:
            sql = text("INSERT INTO groups (token) VALUES (:token)")
            db.session.execute(sql, {"token": token})
        except Exception as error: # pylint: disable=broad-except
            db.session.rollback()
            raise error

        db.session.commit()

default_group_repository = GroupRepository()
