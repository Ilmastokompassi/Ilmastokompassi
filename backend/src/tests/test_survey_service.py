import unittest
from src.services.survey_service import SurveyService


class mock_survey_repository:
    def __init__(self) -> None:
        self.answers = []

    def get_questions(self):
        return [
            {"id": 1, "content": "kysymys 1", "profile_id": 1},
            {"id": 2, "content": "kysymys 2", "profile_id": 2},
            {"id": 3, "content": "kysymys 3", "profile_id": 3},
            {"id": 4, "content": "kysymys 4", "profile_id": 4},
            {"id": 5, "content": "kysymys 5", "profile_id": 4}
        ]

    def save_answers(self, answers):
        for question_id, score in answers.items():
            self.answers.append(
                {"id": len(self.answers) + 1,
                 "response_id": 1,
                 "question_id": question_id,
                 "score": score}
            )

        return 1

    def get_response_answers(self, response_id):
        score_profile = []
        for answer in self.answers:
            profile_id = None
            for question in self.get_questions():
                if question["id"] == answer["question_id"]:
                    profile_id = question["profile_id"]
                    break
            score_profile.append(
                (answer["score"], profile_id))

        return score_profile

    def get_answer_count(self, response_id):
        count = 0
        for answer in self.answers:
            if answer["response_id"] == response_id:
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
        question1 = {"id": 1, "content": "kysymys 1", "profile_id": 1}
        question2 = {"id": 2, "content": "kysymys 2", "profile_id": 2}
        question3 = {"id": 3, "content": "kysymys 3", "profile_id": 3}
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

    def test_climate_percentage_zero(self):
        answers = {1: 1, 2: 1, 3: 1, 4: 1, 5: 1}
        response_id = self.survey_service.save_answers(answers)
        percentages = self.survey_service.get_climate_percentages(response_id)

        self.assertDictEqual(
            {1: 0, 2: 0, 3: 0, 4: 0},
            percentages
        )

    def test_climate_percentage_100(self):
        answers = {1: 5, 2: 5, 3: 5, 4: 5, 5: 5}
        response_id = self.survey_service.save_answers(answers)
        percentages = self.survey_service.get_climate_percentages(response_id)

        self.assertDictEqual(
            {1: 100, 2: 100, 3: 100, 4: 100},
            percentages
        )

    def test_climate_percentages_mix(self):
        answers = {1: 1, 2: 2, 3: 3, 4: 4, 5: 5}
        response_id = self.survey_service.save_answers(answers)
        percentages = self.survey_service.get_climate_percentages(response_id)

        self.assertDictEqual(
            {1: 0, 2: 25, 3: 50, 4: 88},
            percentages
        )

    def test_get_summary(self):
        answers = {1: 1, 2: 2, 3: 3, 4: 4}
        response_id = self.survey_service.save_answers(answers)
        summary, count, total_questions_count = self.survey_service.get_summary(
            response_id)

        self.assertDictEqual(
            {1: 0, 2: 25, 3: 50, 4: 75},
            summary
        )
        self.assertEqual(count, 4)
        self.assertEqual(total_questions_count, 5)

    def test_save_answers_exception(self):
        self.mock_survey_repository.save_answers = Exception("Test exception")
        with self.assertRaises(Exception):
            self.survey_service.save_answers({1: 1, 2: 2, 3: 3, 4: 4, 5: 5})

    def test_get_climate_percentages_exception(self):
        self.mock_survey_repository.get_response_answers = Exception(
            "Test exception")
        with self.assertRaises(Exception):
            self.survey_service.get_climate_percentages(1)
