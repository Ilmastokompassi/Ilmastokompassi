from flask import jsonify, abort, request, current_app as app
from src.services.profile_service import default_profile_service
from src.services.questions_service import default_questions_service
from src.extensions import db
from sqlalchemy.sql import text


@app.route("/")
def index():
    return "Hello world!"


@app.route("/api/test-content")
def apitest():
    res = {
        "content": "This is the test content"
    }

    return res


@app.route("/api/question")
def total_questions():
    questions_list = default_questions_service.get_questions()
    return questions_list


@app.route("/api/profiles")
def profiles():
    profile_list = default_profile_service.get_profiles()
    return jsonify(profile_list)


@app.route("/api/question/<int:question_id>")
def individual_question(question_id):
    questions_list = default_questions_service.get_questions()
    question = next(
        (q for q in questions_list if q['id'] == question_id), None)
    if question is None:
        abort(404, description="Question not found")

    return jsonify(question)

@app.route("/api/submit", methods=['POST'])
def submit():
    data = request.get_json()
    responses = data.get('responses')
    
    sql_user = text(
        "INSERT INTO users VALUES (default) RETURNING id"
    )
    
    user_id = db.session.execute(sql_user).fetchone()[0]
    
    try:
        for question_id, answer in responses.items():
            db.session.execute(text("""
                            INSERT INTO answers (user_id, question_id, score)
                            VALUES (:user_id, :question_id, :score)"""), {"user_id": user_id, "question_id": question_id, "score": answer})
        db.session.commit()                   
    except Exception as e:
        print(e)
        db.session.rollback()
        return jsonify({"status": "error", "message": str(e)}), 500
