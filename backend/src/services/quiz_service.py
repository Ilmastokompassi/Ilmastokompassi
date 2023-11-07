from src.repositories.quiz_repository import default_quiz_repository


class QuizService:

    def __init__(self, quiz_repository=default_quiz_repository):
        self.quiz_repository = quiz_repository

    def get_questions(self):
        return self.quiz_repository.get_questions_hc()

    def create_quiz_response(self, group_token=None):
        try:
            return self.quiz_repository.create_quiz_response(group_token)
        except Exception as error:
            raise error

    def save_answers(self, answers, group_token=None):
        try:
            response_id = self.quiz_repository.save_answers(
                answers, group_token)
        except Exception as error:
            raise error

        return response_id

    def get_response_answers(self, response_id):
        try:
            return self.quiz_repository.get_response_answers(response_id)
        except Exception as error:
            raise error


default_quiz_service = QuizService(default_quiz_repository)
