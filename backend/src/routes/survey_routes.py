from flask import Blueprint, jsonify, abort, request
from src.services.profile_service import default_profile_service
from src.services.survey_service import default_survey_service
from src.services.group_service import default_group_service

survey_routes = Blueprint('roleSurvey', __name__, url_prefix='/survey')


@survey_routes.get("/roles")
def roles():
    try:
        return jsonify(default_profile_service.get_profiles())

    except Exception:  # pylint: disable=broad-except
        return jsonify(error="Something went wrong!"), 500


@survey_routes.get("/questions")
def total_questions():
    try:
        return jsonify(default_survey_service.get_questions())

    except Exception:  # pylint: disable=broad-except
        return jsonify(error="Something went wrong!"), 500


@survey_routes.get("/questions/<int:question_id>")
def get_question(question_id):
    try:
        questions_list = default_survey_service.get_questions()
        question = next(
            (q for q in questions_list if q['id'] == question_id), None)
        if question is None:
            abort(404, description="Question not found")
        return jsonify(question)

    except Exception:  # pylint: disable=broad-except
        return jsonify(error="Something went wrong!"), 500


@survey_routes.post("/submit")
def submit():
    data = request.get_json()
    responses = data.get('responses')
    group_token = data.get('groupToken')

    try:
        response_id = default_survey_service.save_answers(responses)
        if group_token:
            default_group_service.insert_group_token_to_responses(
                group_token, response_id)
        return jsonify({"status": "success",
                        "message": "Answers submitted successfully",
                        "user_id": response_id})
    except Exception:  # pylint: disable=broad-except
        return jsonify({"status": "fail",
                        "message": "Something went wrong"}), 500


@survey_routes.get('/summary/<int:response_id>')
def get_summary(response_id):
    try:
        summary, count, total_questions_count = default_survey_service.get_summary(
            response_id)
        return jsonify(count=count, summary=summary, total_questions_count=total_questions_count)
    except Exception:  # pylint: disable=broad-except
        return jsonify(error="Something went wrong!"), 500
