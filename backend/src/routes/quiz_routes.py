from flask import Blueprint, jsonify, request
from src.services.quiz_service import default_quiz_service

quiz_routes = Blueprint('quiz', __name__, url_prefix='/quiz')


@quiz_routes.post('/new')
def create_new_quiz_response():
    data = request.get_json()
    group_token = data.get("groupToken")
    try:
        response_id = default_quiz_service.create_quiz_response(group_token)
        return jsonify(response_id=response_id)
    except Exception:  # pylint: disable=broad-except
        return jsonify(error="Could not create response_id"), 500


@quiz_routes.get("/questions")
def get_quiz_questions():
    try:
        return jsonify(default_quiz_service.get_questions())
    except Exception:  # pylint: disable=broad-except
        return jsonify(error="Could not get questions"), 500


@quiz_routes.get("/answers/<string:question_id>")
def get_correct_answers(question_id):
    try:
        correct_answers = default_quiz_service.get_correct_answers(question_id)
        return jsonify(correct_answers=correct_answers)
    except Exception:  # pylint: disable=broad-except
        return jsonify("Could not fetch correct answers"), 500


@quiz_routes.post("/save")
def save_quiz_answer():
    data = request.get_json()
    answer = data.get("answer")
    response_id = data.get("responseId")
    question_id = data.get("questionId")
    try:
        default_quiz_service.save_answers(
            question_id, answer, response_id)
        correct_answers = default_quiz_service.get_correct_answers(question_id)
        info_text = default_quiz_service.get_info_text(question_id)
        return jsonify(correct_answers=correct_answers, info_text=info_text)
    except Exception:  # pylint: disable=broad-except
        return jsonify("error"), 500


@quiz_routes.get("/summary")
def get_quiz_summary():
    try:
        summary = default_quiz_service.get_all_questions_and_answers()
        return jsonify(summary)
    except Exception:  # pylint: disable=broad-except
        return jsonify(error="Could not get summary"), 500
