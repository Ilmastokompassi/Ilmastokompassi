from flask import Blueprint, jsonify, request
from werkzeug.exceptions import NotFound
from src.services.profile_service import default_profile_service
from src.services.survey_service import default_survey_service
from src.services.group_service import default_group_service

survey_routes = Blueprint('roleSurvey', __name__, url_prefix='/survey')


@survey_routes.get("/roles")
def roles():
    return jsonify(default_profile_service.get_profiles())


@survey_routes.get("/questions")
def total_questions():
    return jsonify(default_survey_service.get_questions())


@survey_routes.get("/questions/<int:question_id>")
def get_question(question_id):
    questions_list = default_survey_service.get_questions()
    question = next(
        (q for q in questions_list if q['id'] == question_id), None)
    if question is None:
        raise NotFound("Question not found")
    return jsonify(question)


@survey_routes.post("/submit")
def submit():
    data = request.get_json()
    responses = data.get('responses')
    group_token = data.get('groupToken')

    response_id = default_survey_service.save_answers(responses)
    if group_token:
        default_group_service.insert_group_token_to_responses(
            group_token, response_id)

    return jsonify({"user_id": response_id})


@survey_routes.get('/summary/<int:response_id>')
def get_summary(response_id):
    summary, count, total_questions_count = default_survey_service.get_summary(
        response_id)
    return jsonify(count=count, summary=summary, total_questions_count=total_questions_count)
