from src.repositories.survey_repository import default_survey_repository

SCORES = {
    1: 0,
    2: 25,
    3: 50,
    4: 75,
    5: 100
}


class SurveyService:
    # pylint: disable=too-few-public-methods

    def __init__(self, survey_repository=default_survey_repository):
        self.survey_repository = survey_repository

    def get_questions(self):
        return self.survey_repository.get_questions()

    def save_answers(self, answers):
        answers_with_scores = {}
        try:
            for question_id, answer in answers.items():
                answers_with_scores[question_id] = SCORES[answer]

            return self.survey_repository.save_answers(answers_with_scores)
        except Exception as error:
            raise error

    def get_answer_count(self, user_id):
        return self.survey_repository.get_answer_count(user_id)


default_survey_service = SurveyService(default_survey_repository)
