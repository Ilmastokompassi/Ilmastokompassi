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

            response_id = self.survey_repository.save_answers(
                answers_with_scores)
        except Exception as error:
            raise error

        return response_id

    def get_climate_percentages(self, response_id):
        try:
            score_profile = self.survey_repository.get_response_answers(
                response_id)
        except Exception as error:
            raise error

        total_scores = {}

        for score, profile_id in score_profile:
            if profile_id not in total_scores:
                total_scores[profile_id] = {"count": 0, "score": 0}

            total_count = total_scores[profile_id]["count"] + 1
            total_score = total_scores[profile_id]["score"] + score

            total_scores[profile_id] = {
                "count": total_count,
                "score": total_score}

        total_percentages = {}
        for profile, values in total_scores.items():
            total_percentages[profile] = round(
                values["score"] / values["count"])

        return total_percentages

    def get_summary(self, response_id):
        summary = self.get_climate_percentages(response_id)
        count = self.survey_repository.get_answer_count(response_id)
        total_questions_count = len(self.get_questions())
        return summary, count, total_questions_count


default_survey_service = SurveyService(default_survey_repository)
