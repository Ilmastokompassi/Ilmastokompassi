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
    questions_list = default_survey_service.get_questions()
    return jsonify(questions_list)


@api.route("/profiles")
def profiles():
    profile_list = default_profile_service.get_profiles()
    return jsonify(profile_list)


@api.route("/question/<int:question_id>")
def individual_question(question_id):
    questions_list = default_survey_service.get_questions()
    question = next(
        (q for q in questions_list if q['id'] == question_id), None)
    if question is None:
        abort(404, description="Question not found")

    return jsonify(question)


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
                        "user_id": response_id}), 200
    except Exception as error:  # pylint: disable=broad-except
        print("ROUTE submit", error)
        return jsonify({"status": "fail",
                        "message": "Something went wrong"}), 418


@api.route('/summary/<int:response_id>', methods=['GET'])
def get_summary(response_id):
    try:
        summary, count, total_questions_count = default_survey_service.get_summary(
            response_id)
        return jsonify(count=count, summary=summary, total_questions_count=total_questions_count)
    except Exception as error:  # pylint: disable=broad-except
        print(error)
        return jsonify(error="Something went wrong!"), 500


@api.route('/new-group', methods=['POST'])
def new_group():
    data = request.get_json()
    token = data.get('token')
    try:
        if default_group_service.is_group_name_valid(token):
            if not default_group_service.check_if_group_exists(token):
                group_token = default_group_service.save_group(token)
                return jsonify({"status": "success",
                                "message": "Group created successfully",
                                "group_token": group_token}), 200
            return jsonify({"status": "fail",
                            "message": "Group already exists"}), 400
        return jsonify({"status": "fail",
                        "message": "Invalid group name"}), 400
    except Exception as error:  # pylint: disable=broad-except
        print(error)
        return jsonify(error="Something went wrong!"), 500


@api.route('/group/<string:group_token>', methods=['GET'])
def get_group(group_token):
    try:
        group_token = default_group_service.check_if_group_exists(group_token)
        return jsonify(group_token=group_token)
    except Exception as error:  # pylint: disable=broad-except
        print(error)
        return jsonify(error="Something went wrong!"), 500


@api.route('/group/<string:group_token>/score', methods=['GET'])
def get_group_score(group_token):
    try:
        score, response_amount = default_group_service.fetch_scores_by_group(
            group_token)
        return jsonify(score=score, response_amount=response_amount)
    except Exception as error:  # pylint: disable=broad-except
        print(error)
        return jsonify(error="Something went wrong!"), 500


@api.route('/new-quiz', methods=["POST"])
def create_new_quiz_response():
    data = request.get_json()
    group_token = data.get("groupToken")
    try:
        response_id = default_quiz_service.create_quiz_response(group_token)
        return jsonify(response_id=response_id)
    except Exception as error:
        print("Error creating quiz response_id:", error)
        return jsonify(error="Could not create response_id"), 500


@api.route("/quiz", methods=["GET"])
def get_quiz_questions():
    try:
        quiz = default_quiz_service.get_questions()
        return jsonify(quiz)
    except Exception as error:
        print(error)
        return jsonify(error="Could not get questions"), 500
