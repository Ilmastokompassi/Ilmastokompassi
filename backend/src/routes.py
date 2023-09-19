from flask import jsonify, abort
import json
from app import app
import os


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
        with open(questions_file_path, 'r') as file:
            questions = json.load(file)
    except FileNotFoundError:
        abort(500, description="questions.json not found")

    return questions


@app.route("/api/question")
def total_questions():
    return load_json()


@app.route("/api/question/<int:id>")
def question(id):
    questions = load_json()

    question = next((q for q in questions if q['id'] == id), None)

    if question is None:
        abort(404, description="Question not found")

    return jsonify(question)
