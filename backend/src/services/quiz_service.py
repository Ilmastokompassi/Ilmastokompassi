from src.repositories.quiz_repository import default_quiz_repository

class QuizService:
    
    def __init__(self, quiz_repository=default_quiz_repository):
        self.quiz_repository = quiz_repository

    def get_questions(self):
        return self.quiz_repository.get_questions()
    
    def save_answers(self, answers, group_token=None):
        try:
            response_id = self.quiz_repository.save_answers(answers, group_token)
        except Exception as error:
            raise error

        return response_id
default_quiz_service = QuizService(default_quiz_repository)