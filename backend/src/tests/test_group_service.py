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
        self.mock_group_repository.check_if_group_exists.assert_called_once_with(
            token)

    def test_is_group_name_valid(self):
        self.assertTrue(self.group_service.is_group_name_valid("TEST1234"))
        self.assertTrue(self.group_service.is_group_name_valid("1234567890"))
        self.assertFalse(self.group_service.is_group_name_valid(""))
        self.assertFalse(self.group_service.is_group_name_valid("test"))
        self.assertFalse(
            self.group_service.is_group_name_valid("test123456789"))

    def test_insert_group_token_to_responses(self):
        token = "test_token"
        response_id = 1
        self.group_service.insert_group_token_to_responses(token, response_id)
        self.mock_group_repository.insert_group_token_to_responses.assert_called_once_with(
            token, response_id)

    def test_save_group_exception(self):
        self.mock_group_repository.save_group.side_effect = Exception(
            "Error saving group")
        with self.assertRaises(Exception):
            self.group_service.save_group("test_token")

    def test_check_if_group_exists_exception(self):
        self.mock_group_repository.check_if_group_exists.side_effect = Exception(
            "Error checking if group exists")
        with self.assertRaises(Exception):
            self.group_service.check_if_group_exists("test_token")

    def test_insert_group_token_to_responses(self):
        self.mock_group_repository.insert_group_token_to_responses.side_effect = Exception(
            "Error inserting group token to responses")
        with self.assertRaises(Exception):
            self.group_service.insert_group_token_to_responses("test_token", 1)


if __name__ == '__main__':
    unittest.main()
