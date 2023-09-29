class ProfileRepository:
    # pylint: disable=too-few-public-methods

    def get_profiles(self):
        profiles = [{'id': 1, 'description': 'first', 'title': 'first'},
                    {'id': 2, 'description': 'sec', 'title': 'sec'},
                    {'id': 3, 'description': 'third', 'title': 'third'},
                    {'id': 4, 'description': 'fourth', 'title': 'fourth'}]
        return profiles


default_profile_repository = ProfileRepository()
