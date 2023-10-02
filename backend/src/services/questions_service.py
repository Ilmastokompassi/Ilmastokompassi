from src.repositories.questions_repository import default_questions_repository


class QuestionsService:
    # pylint: disable=too-few-public-methods

    def __init__(self, questions_repository=default_questions_repository):
        self.questions_repository = questions_repository

    def get_questions(self):
        return self.questions_repository.get_questions()


default_questions_service = QuestionsService(default_questions_repository)
