from sqlalchemy import text
from src.extensions import db


class ProfileRepository:
    def get_profiles(self):
        result = db.session.execute(
            text("SELECT * FROM profiles;")).mappings().all()
        profiles = [dict(row) for row in result]
        return profiles


default_profile_repository = ProfileRepository()
