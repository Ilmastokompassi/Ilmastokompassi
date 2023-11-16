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

    def test_score_list_to_dict_and_response_amount_works(self):
        test_scores = [(100, 1, 1), (100, 2, 1), (75, 3, 1), (50, 4, 1), (100, 1, 1), (100, 2, 1),
                       (25, 1, 2), (100, 2, 2), (50, 3, 2), (25, 4, 2), (0, 1, 2), (100, 2, 2)]
        final_score, response_amount = self.group_service._list_to_dict_and_response_amount(
            test_scores)
        self.assertEqual(final_score, {1: 225, 2: 400, 3: 125, 4: 75})
        self.assertEqual(response_amount, 2)


if __name__ == '__main__':
    unittest.main()
