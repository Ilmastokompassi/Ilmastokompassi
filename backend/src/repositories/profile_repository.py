class ProfileRepository:

    def get_profiles(self):
        profiles = [{'id': 1, 'description': 1, 'title': 1},
                    {'id': 2, 'description': 2, 'title': 2},
                    {'id': 3, 'description': 3, 'title': 3},
                    {'id': 4, 'description': 4, 'title': 4}]
        return profiles


default_profile_repository = ProfileRepository()
