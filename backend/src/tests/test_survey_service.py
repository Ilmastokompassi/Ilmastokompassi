import unittest
from src.services.survey_service import SurveyService


class mock_survey_repository:
    def __init__(self) -> None:
        self.answers = []

    def get_questions(self):
        return [
            {"id": 1, "content": "kysymys 1", "climate_profile_id": 1},
            {"id": 2, "content": "kysymys 2", "climate_profile_id": 2},
            {"id": 3, "content": "kysymys 3", "climate_profile_id": 3},
            {"id": 4, "content": "kysymys 4", "climate_profile_id": 4},
            {"id": 5, "content": "kysymys 5", "climate_profile_id": 4},

        ]

    def save_answers(self, answers):
        for question_id, answer in answers.items():
            self.answers.append(
                {"id": 1,
                 "user_id": 1,
                 "question_id": question_id,
                 "score": answer}
            )

        return 1

    def get_answer_count(self, user_id):
        count = 0
        for answer in self.answers:
            if answer["user_id"] == user_id:
                count += 1
        return count


class TestApp(unittest.TestCase):
    def setUp(self):
        self.mock_survey_repository = mock_survey_repository()
        self.survey_service = SurveyService(self.mock_survey_repository)

    def test_get_correct_amount_of_questions(self):
        result = self.survey_service.get_questions()
        self.assertEqual(len(result), 5)

    def test_get_correct_questions(self):
        result = self.survey_service.get_questions()
        question1 = {"id": 1, "content": "kysymys 1", "climate_profile_id": 1}
        question2 = {"id": 2, "content": "kysymys 2", "climate_profile_id": 2}
        question3 = {"id": 3, "content": "kysymys 3", "climate_profile_id": 3}
        self.assertDictEqual(result[0], question1)
        self.assertDictEqual(result[1], question2)
        self.assertDictEqual(result[2], question3)

    def test_answers_are_translated_to_scores_and_saved(self):
        answers = {1: 1, 2: 2, 3: 3, 4: 4, 5: 5}
        self.survey_service.save_answers(answers)
        saved_answers = self.mock_survey_repository.answers
        self.assertEqual(len(saved_answers), 5)

        scores = [x["score"] for x in saved_answers]
        self.assertListEqual(scores, [0, 25, 50, 75, 100])

    def test_answer_count(self):
        initial_count = self.survey_service.get_answer_count(1)
        self.assertEqual(initial_count, 0)
        self.survey_service.save_answers({2: 3})

        count = self.survey_service.get_answer_count(1)
        self.assertEqual(count, 1)
