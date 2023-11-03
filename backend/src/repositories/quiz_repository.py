from sqlalchemy import text
from src.extensions import db


class QuizRepository:

    def get_questions(self):
        result = db.session.execute(
            text("SELECT id, content, info_text FROM quiz_questions;")).mappings().all()
        questions = [dict(row) for row in result]
        return questions

    def save_answers(self, answers, group_token=None):
        try:
            with db.session.begin_nested():
                if group_token:
                    response = text("""
                                    INSERT INTO responses (group_token)
                                    VALUES (:group_token) RETURNING id;
                                    """)
                    result = db.session.execute(
                        response, {"group_token": group_token})
                else:
                    response = text("""
                                    INSERT INTO responses DEFAULT VALUES RETURNING id;
                                    """)
                    result = db.session.execute(response)

                response_id = result.fetchone()[0]

                for answer in answers:
                    for selected_option_id in answer['selected_option_ids']:
                        sql = text("""
                                INSERT INTO quiz_answers (response_id, question_id, selected_option_id)
                                VALUES (:response_id, :question_id, :selected_option_id);
                                """)
                        db.session.execute(sql, {
                            'response_id': response_id,
                            'question_id': answer['question_id'],
                            'selected_option_id': selected_option_id
                        })

                db.session.commit()
        except Exception as error:  # pylint: disable=broad-except
            db.session.rollback()
            raise error

    def get_response_answers(self, response_id):
        sql = text("""SELECT question_id, selected_option_id FROM quiz_answers
                    WHERE response_id=:response_id;
                    """)
        try:
            return db.session.execute(sql, {"response_id": response_id}).fetchall()
        except Exception as error:
            raise error


default_quiz_repository = QuizRepository()
