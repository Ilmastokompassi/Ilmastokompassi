import os
import json
from flask import jsonify, abort, current_app as app

@app.route("/")
def index():
    return "Hello world!"


@app.route("/api/test-content")
def apitest():
    res = {
        "content": "This is the test content"
    }

    return res


def load_json():
    dir_path = os.path.dirname(os.path.realpath(__file__))
    questions_file_path = os.path.join(
        dir_path, 'static', 'questions.json')
    try:
        with open(questions_file_path, 'r', encoding='utf-8') as file:
            questions = json.load(file)
    except FileNotFoundError:
        abort(500, description="questions.json not found")

    return questions


@app.route("/api/question")
def total_questions():
    return load_json()


@app.route("/api/question/<int:question_id>")
def individual_question(question_id):
    questions = load_json()

    question = next((q for q in questions if q['id'] == question_id), None)

    if question is None:
        abort(404, description="Question not found")

    return jsonify(question)
