import unittest
from src.services.quiz_service import QuizService


class QuizRepositoryMock:
    def __init__(self) -> None:
        self.answers = []

    def get_questions(self):
        return [
            {"question_id": 1, "content": "kysymys 1", "introduction": "",
                "option_id": 1, "option": "vastaus 1"},
            {"question_id": 1, "content": "kysymys 1", "introduction": "",
                "option_id": 2, "option": "vastaus 2"},
            {"question_id": 1, "content": "kysymys 1", "introduction": "",
                "option_id": 3, "option": "vastaus 3"},
            {"question_id": 2, "content": "kysymys 2", "introduction": "Alustus",
                "option_id": 4, "option": "vastaus 1"},
            {"question_id": 3, "content": "kysymys 3", "introduction": "",
                "option_id": 5, "option": "vastaus 1"},
            {"question_id": 3, "content": "kysymys 3", "introduction": "",
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

    def create_quiz_response(self, group_token=None):
        return 1

    def get_correct_answers(self, question_id):
        return [1, 2, 3]

    def get_info_text(self, question_id):
        return "info text"

    def get_all_questions_and_answers(self):
        return [('kysymys 1', 'vastaus 1'), ('kysymys 1', 'vastaus 2'), ('kysymys 1', 'vastaus 3'), ('kysymys 2', 'vastaus 1')]


class TestQuizService(unittest.TestCase):
    def setUp(self):
        self.quiz_repository_mock = QuizRepositoryMock()
        self.quiz_service = QuizService(self.quiz_repository_mock)

    def test_get_questions(self):
        result = self.quiz_service.get_questions()
        self.assertEqual(len(result), 3)
        self.assertEqual(result[1]["id"], 1)
        self.assertEqual(result[1]["content"], "kysymys 1")
        self.assertEqual(result[1]["introduction"], "")
        self.assertEqual(result[2]["introduction"], "Alustus")
        self.assertEqual(len(result[1]["options"]), 3)

    def test_get_questions_exception(self):
        self.quiz_repository_mock.get_questions = Exception(
            "Test exception"
        )
        with self.assertRaises(Exception):
            self.quiz_service.get_questions()

    def test_get_response_answers(self):
        self.quiz_repository_mock.answers = [
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

    def test_get_response_answers_exception(self):
        self.quiz_repository_mock.get_response_answers = Exception(
            "Test exception"
        )
        with self.assertRaises(Exception):
            self.quiz_service.get_response_answers(1)

    def test_create_quiz_response(self):
        result = self.quiz_service.create_quiz_response()
        self.assertEqual(result, 1)

    def test_create_quiz_response(self):
        self.quiz_repository_mock.create_quiz_response = Exception(
            "Test exception"
        )
        with self.assertRaises(Exception):
            self.quiz_service.create_quiz_response()

    def test_save_answers(self):
        result = self.quiz_service.save_answers(1, [1, 2, 3], 1)
        self.assertEqual(result, 1)

    def test_save_answers_exception(self):
        self.quiz_repository_mock.save_answers = Exception(
            "Test exception"
        )
        with self.assertRaises(Exception):
            self.quiz_service.save_answers(1, [1, 2, 3], 1)

    def test_get_correct_answers(self):
        result = self.quiz_service.get_correct_answers(1)
        self.assertEqual(result, [1, 2, 3])

    def test_get_correct_answers_exception(self):
        self.quiz_repository_mock.get_correct_answers = Exception(
            "Test exception"
        )
        with self.assertRaises(Exception):
            self.quiz_service.get_correct_answers(-1)

    def test_get_info_text(self):
        result = self.quiz_service.get_info_text(1)
        self.assertEqual(result, "info text")

    def test_get_info_text_exception(self):
        self.quiz_repository_mock.get_info_text = Exception(
            "Test exception"
        )
        with self.assertRaises(Exception):
            self.quiz_service.get_info_text(-1)

    def test_get_all_questions_and_answers(self):
        result = self.quiz_service.get_all_questions_and_answers()

        # Check the number of unique questions
        self.assertEqual(len(result), 2)

        # Check details for the first question
        self.assertEqual(result[0]['question_text'], 'kysymys 1')
        self.assertListEqual(result[0]['correct_answers'], [
                             'vastaus 1', 'vastaus 2', 'vastaus 3'])

    def test_get_all_questions_and_answers_exception(self):
        self.quiz_repository_mock.get_all_questions_and_answers = Exception(
            "Test exception"
        )
        with self.assertRaises(Exception):
            self.quiz_service.get_all_questions_and_answers()
