from flask import Blueprint, jsonify, abort, request
from src.services.profile_service import default_profile_service
from src.services.survey_service import default_survey_service
from src.services.group_service import default_group_service
from src.services.quiz_service import default_quiz_service

api = Blueprint('api', __name__, url_prefix='/api')


@api.route("/ping")
def ping():
    return "pong"


@api.route("/question")
def total_questions():
    try:
        questions_list = default_survey_service.get_questions()
        return jsonify(questions_list)

    except Exception:  # pylint: disable=broad-except
        return jsonify(error="Something went wrong!"), 500


@api.route("/roles")
def roles():
    try:
        role_list = default_profile_service.get_profiles()
        return jsonify(role_list)

    except Exception:  # pylint: disable=broad-except
        return jsonify(error="Something went wrong!"), 500


@api.route("/question/<int:question_id>")
def individual_question(question_id):
    try:
        questions_list = default_survey_service.get_questions()
        question = next(
            (q for q in questions_list if q['id'] == question_id), None)
        if question is None:
            abort(404, description="Question not found")
        return jsonify(question)

    except Exception:  # pylint: disable=broad-except
        return jsonify(error="Something went wrong!"), 500


@api.route("/submit", methods=['POST'])
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


@api.route('/summary/<int:response_id>', methods=['GET'])
def get_summary(response_id):
    try:
        summary, count, total_questions_count = default_survey_service.get_summary(
            response_id)
        return jsonify(count=count, summary=summary, total_questions_count=total_questions_count)
    except Exception:  # pylint: disable=broad-except
        return jsonify(error="Something went wrong!"), 500


@api.route('/group/new', methods=['POST'])
def new_group():
    data = request.get_json()
    token = data.get('token')
    try:
        if default_group_service.is_group_name_valid(token):
            if not default_group_service.check_if_group_exists(token):
                group_token = default_group_service.save_group(token)
                return jsonify({"status": "success",
                                "message": "Group created successfully",
                                "group_token": group_token})
            return jsonify({"status": "fail",
                            "message": "Group already exists"}), 400
        return jsonify({"status": "fail",
                        "message": "Invalid group name"}), 400
    except Exception:  # pylint: disable=broad-except
        return jsonify(error="Something went wrong!"), 500


@api.route('/group/<string:group_token>/summary', methods=['GET'])
def group_summary(group_token):
    try:
        if not default_group_service.check_if_group_exists(group_token):
            return jsonify({"status": "fail",
                            "message": "Group does not exist"}), 400
        return jsonify({"status": "success",
                        "message": "Group exists"})
    except Exception:  # pylint: disable=broad-except
        return jsonify(error="Something went wrong!"), 500


@api.route('/group/<string:group_token>', methods=['GET'])
def get_group(group_token):
    try:
        group_token = default_group_service.check_if_group_exists(group_token)
        return jsonify(group_token=group_token)
    except Exception:  # pylint: disable=broad-except
        return jsonify(error="Something went wrong!"), 500


@api.route('/group/<string:group_token>/score', methods=['GET'])
def get_group_score(group_token):
    try:
        if not default_group_service.check_if_group_exists(group_token):
            return jsonify({"status": "fail",
                            "message": "Group does not exist"}), 400
        score, response_amount = default_group_service.fetch_scores_by_group(
            group_token)
        return jsonify(score=score, response_amount=response_amount)
    except Exception:  # pylint: disable=broad-except
        return jsonify(error="Something went wrong!"), 500


@api.route('/new-quiz', methods=["POST"])
def create_new_quiz_response():
    data = request.get_json()
    group_token = data.get("groupToken")
    try:
        response_id = default_quiz_service.create_quiz_response(group_token)
        return jsonify(response_id=response_id)
    except Exception:  # pylint: disable=broad-except
        return jsonify(error="Could not create response_id"), 500


@api.route("/quiz", methods=["GET"])
def get_quiz_questions():
    try:
        quiz = default_quiz_service.get_questions()
        return jsonify(quiz)
    except Exception:  # pylint: disable=broad-except
        return jsonify(error="Could not get questions"), 500


@api.route("/quiz", methods=["POST"])
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
