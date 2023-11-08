import unittest
from src.services.quiz_service import QuizService


class mock_quiz_repository:
    def __init__(self) -> None:
        self.answers = []

    def get_questions(self):
        return [
            {"question_id": 1, "content": "kysymys 1",
                "option_id": 1, "option": "vastaus 1"},
            {"question_id": 1, "content": "kysymys 1",
                "option_id": 2, "option": "vastaus 2"},
            {"question_id": 1, "content": "kysymys 1",
                "option_id": 3, "option": "vastaus 3"},
            {"question_id": 2, "content": "kysymys 2",
                "option_id": 4, "option": "vastaus 1"},
            {"question_id": 3, "content": "kysymys 3",
                "option_id": 5, "option": "vastaus 1"},
            {"question_id": 3, "content": "kysymys 3",
                "option_id": 6, "option": "vastaus 2"}
        ]

    def save_answers(self, question_id, answers, response_id):

        return 1

    def get_response_answers(self, response_id):
        selected_options = []
        for answer in self.answers:
            if answer["response_id"] == response_id:
                selected_options.append(
                    (answer["question_id"], answer["selected_option_id"]))

        return selected_options


class TestQuizService(unittest.TestCase):
    def setUp(self):
        self.mock_quiz_repository = mock_quiz_repository()
        self.quiz_service = QuizService(self.mock_quiz_repository)

    def test_get_questions(self):
        result = self.quiz_service.get_questions()
        self.assertEqual(len(result), 3)
        self.assertEqual(result[1]["id"], 1)
        self.assertEqual(result[1]["content"], "kysymys 1")
        self.assertEqual(len(result[1]["options"]), 3)

    def test_get_response_answers(self):
        self.mock_quiz_repository.answers = [
            {"id": 1, "response_id": 1, "question_id": 1, "selected_option_id": 1},
            {"id": 2, "response_id": 1, "question_id": 2, "selected_option_id": 2},
            {"id": 3, "response_id": 1, "question_id": 3, "selected_option_id": 3},
            {"id": 4, "response_id": 1, "question_id": 4, "selected_option_id": 4},
            {"id": 5, "response_id": 1, "question_id": 5, "selected_option_id": 5}
        ]
        result = self.quiz_service.get_response_answers(1)
        self.assertEqual(len(result), 5)
        self.assertEqual(result[0][0], 1)
        self.assertEqual(result[0][1], 1)

    def test_save_answers_exception(self):
        self.mock_quiz_repository.save_answers = Exception(
            "Test exception"
        )
        answers = [
            {"question_id": 1, "selected_option_ids": [1]},
            {"question_id": 2, "selected_option_ids": [2]},
            {"question_id": 3, "selected_option_ids": [3]},
            {"question_id": 4, "selected_option_ids": [4]},
            {"question_id": 5, "selected_option_ids": [5]}
        ]
        with self.assertRaises(Exception):
            self.quiz_service.save_answers(answers)

    def test_get_response_answers_exception(self):
        self.mock_quiz_repository.get_response_answers = Exception(
            "Test exception"
        )
        with self.assertRaises(Exception):
            self.quiz_service.get_response_answers(1)
