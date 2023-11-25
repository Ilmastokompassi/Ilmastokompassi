from sqlalchemy import text
from src.extensions import db


class QuizRepository:

    def get_questions(self):
        result = db.session.execute(
            text("""
            SELECT Q.id AS question_id, Q.content, O.id AS option_id, O.option
            FROM quiz_questions AS Q
            JOIN quiz_question_options AS O ON O.question_id = Q.id;""")).mappings().all()
        questions = [dict(row) for row in result]
        return questions

    def create_quiz_response(self, group_token=None):
        try:
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
            db.session.commit()
            return result.fetchone()[0]
        except Exception as error:
            raise error

    def save_answers(self, question_id, answers, response_id):
        try:
            for option_id in answers:
                sql = text("""
                        INSERT INTO quiz_answers (response_id, question_id, selected_option_id)
                        VALUES (:response_id, :question_id, :selected_option_id);
                        """)
                db.session.execute(sql, {
                    'response_id': response_id,
                    'question_id': question_id,
                    'selected_option_id': option_id
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

    def get_correct_answers(self, question_id):
        sql = text("""
            SELECT id FROM quiz_question_options
                WHERE is_correct=true AND question_id=:question_id
            """)
        try:
            result = db.session.execute(
                sql, {"question_id": question_id}).fetchall()
            return [id[0] for id in result]
        except Exception as error:
            raise error

    def get_info_text(self, question_id):
        sql = text("""
            SELECT info_text FROM quiz_questions WHERE id=:question_id
            """)
        try:
            return db.session.execute(
                sql, {"question_id": question_id}
            ).fetchone()[0]
        except Exception as error:
            raise error

    def get_all_questions_and_answers(self):
        sql = text("""
                   SELECT q.content AS question_text,
                   o.option AS correct_answer
                   FROM quiz_questions AS q
                   JOIN quiz_question_options AS o ON q.id = o.question_id
                   WHERE o.is_correct = TRUE
                   ORDER BY q.id, o.id
                   """)
        try:
            return db.session.execute(sql).fetchall()
        except Exception as error:
            raise error


default_quiz_repository = QuizRepository()
