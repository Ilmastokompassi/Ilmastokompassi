import unittest
from unittest.mock import MagicMock
from src.services.group_service import GroupService


class TestGroupService(unittest.TestCase):
    def setUp(self):
        self.mock_group_repository = MagicMock()
        self.group_service = GroupService(self.mock_group_repository)

    def test_save_group(self):
        token = "test_token"
        self.group_service.save_group(token)
        self.mock_group_repository.save_group.assert_called_once_with(token)

    def test_check_if_group_exists(self):
        token = "test_token"
        self.group_service.check_if_group_exists(token)
        self.mock_group_repository.check_if_group_exists.assert_called_once_with(token)

    def test_is_group_name_valid(self):
        self.assertTrue(self.group_service.is_group_name_valid("TEST1234"))
        self.assertTrue(self.group_service.is_group_name_valid("1234567890"))
        self.assertFalse(self.group_service.is_group_name_valid(""))
        self.assertFalse(self.group_service.is_group_name_valid("test"))
        self.assertFalse(self.group_service.is_group_name_valid("test123456789"))

if __name__ == '__main__':
    unittest.main()
    
