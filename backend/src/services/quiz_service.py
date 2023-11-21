from src.repositories.quiz_repository import default_quiz_repository


class QuizService:

    def __init__(self, quiz_repository=default_quiz_repository):
        self.quiz_repository = quiz_repository

    def get_questions(self):
        try:
            questions_options_rows = self.quiz_repository.get_questions()
            questions = {}
            for question_options in questions_options_rows:
                question_id = question_options["question_id"]
                if question_id not in questions:
                    questions[question_id] = {
                        "id": question_id,
                        "content": question_options["content"],
                        "options": []}
                questions[question_id]["options"].append(
                    {
                        "id": question_options["option_id"],
                        "name": question_options["option"]
                    }
                )

            return questions
        except Exception as error:
            raise error

    def create_quiz_response(self, group_token=None):
        try:
            return self.quiz_repository.create_quiz_response(group_token)
        except Exception as error:
            raise error

    def save_answers(self, question_id, answers, response_id):
        try:
            self.quiz_repository.save_answers(
                question_id, answers, response_id)
        except Exception as error:
            raise error

        return response_id

    def get_response_answers(self, response_id):
        try:
            return self.quiz_repository.get_response_answers(response_id)
        except Exception as error:
            raise error

    def get_correct_answers(self, question_id):
        try:
            return self.quiz_repository.get_correct_answers(question_id)
        except Exception as error:
            raise error

    def get_info_text(self, question_id):
        try:
            return self.quiz_repository.get_info_text(question_id)
        except Exception as error:
            raise error


default_quiz_service = QuizService(default_quiz_repository)
