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

            user_id = self.survey_repository.save_answers(answers_with_scores)
        except Exception as error:
            raise error

        return user_id

    def get_climate_scores(self, user_id):
        try:
            score_profile = self.survey_repository.get_user_answers(user_id)
        except Exception as error:
            raise error

        total_scores = {}

        for score, profile_id in score_profile:
            if profile_id not in total_scores:
                total_scores[profile_id] = {"count": 0, "score": 0}

            total_scores[profile_id] = {
                "count": total_scores[profile_id]["count"] + 1,
                "score": total_scores[profile_id]["score"] + score}

        total_percentages = {}
        for profile, values in total_scores.items():
            total_percentages[profile] = round(
                values["score"] / values["count"])

        return total_percentages

    def get_summary(self, user_id):
        summary = self.get_climate_scores(user_id)
        count = self.get_answer_count(user_id)
        return summary, count

    def get_answer_count(self, user_id):
        return self.survey_repository.get_answer_count(user_id)


default_survey_service = SurveyService(default_survey_repository)
