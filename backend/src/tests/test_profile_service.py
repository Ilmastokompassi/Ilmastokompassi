import unittest
from src.services.profile_service import ProfileService


class MockProfileRepository:
    # pylint: disable=too-few-public-methods
    def get_profiles(self):
        result = [
            {
                'id': 1,
                'name': 'Ilmastoasiantuntija',
                'description': 'Test description here'
            },
            {
                'id': 2,
                'name': 'Ilmastoasiantuntija',
                'description': 'Test description here'
            },
            {
                'id': 3,
                'name': 'Ilmastoasiantuntija',
                'description': 'Test description here'
            },
            {
                'id': 4,
                'name': 'Ilmastoasiantuntija',
                'description': 'Test description here'
            }
        ]

        profiles = [dict(row) for row in result]
        return profiles


mock_profile_repository = MockProfileRepository()


class TestProfileService(unittest.TestCase):
    def setUp(self):
        self.profile_service = ProfileService(mock_profile_repository)

    def test_get_profiles(self):
        self.assertEqual(self.profile_service.get_profiles(), [
            {'id': 1,
             'name': 'Ilmastoasiantuntija',
             'description': 'Test description here'},
            {'id': 2,
             'name': 'Ilmastoasiantuntija',
             'description': 'Test description here'},
            {'id': 3,
             'name': 'Ilmastoasiantuntija',
             'description': 'Test description here'},
            {'id': 4,
             'name': 'Ilmastoasiantuntija',
             'description': 'Test description here'}
        ])
