from flask import jsonify, abort, request, current_app as app
from src.services.profile_service import default_profile_service
from src.services.survey_service import default_survey_service
from src.services.group_service import default_group_service


@app.route("/")
def index():
    return "Hello world!"


@app.route("/api/question")
def total_questions():
    questions_list = default_survey_service.get_questions()
    return questions_list


@app.route("/api/profiles")
def profiles():
    profile_list = default_profile_service.get_profiles()
    return jsonify(profile_list)


@app.route("/api/question/<int:question_id>")
def individual_question(question_id):
    questions_list = default_survey_service.get_questions()
    question = next(
        (q for q in questions_list if q['id'] == question_id), None)
    if question is None:
        abort(404, description="Question not found")

    return jsonify(question)


@app.route("/api/submit", methods=['POST'])
def submit():
    data = request.get_json()
    responses = data.get('responses')

    try:
        user_id = default_survey_service.save_answers(responses)
        return jsonify({"status": "success",
                        "message": "Answers submitted successfully",
                        "user_id": user_id}), 200
    except Exception as error:  # pylint: disable=broad-except
        print("ROUTE submit", error)
        return jsonify({"status": "fail",
                        "message": "Something went wrong"}), 418


@app.route('/api/summary/<int:user_id>', methods=['GET'])
def get_summary(user_id):
    try:
        summary, count, total_questions_count = default_survey_service.get_summary(
            user_id)
        return jsonify(count=count, summary=summary, total_questions_count=total_questions_count)
    except Exception as error:  # pylint: disable=broad-except
        print(error)
        return jsonify(error="Something went wrong!"), 500
    
@app.route('/api/new-group', methods=['POST'])
def new_group():
    data = request.get_json()
    token = data.get('token')
    try:
        group_token = default_group_service.save_group(token)
        return jsonify({"status": "success",
                        "message": "Group created successfully",
                        "group_token": group_token}), 200
    except Exception as error:
        print(error)
        return jsonify(error="Something went wrong!"), 500