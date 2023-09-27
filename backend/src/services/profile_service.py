from src.repositories.profile_repository import default_profile_repository


class ProfileService:
    # pylint: disable=too-few-public-methods

    def __init__(self, profile_repository=default_profile_repository):
        self.profile_repository = profile_repository

    def get_profiles(self):
        return self.profile_repository.get_profiles()


default_profile_service = ProfileService(default_profile_repository)
