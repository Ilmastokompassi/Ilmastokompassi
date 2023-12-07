from flask import Blueprint, jsonify
from werkzeug.exceptions import HTTPException, InternalServerError
from src.routes.survey_routes import survey_routes
from src.routes.group_routes import group_routes
from src.routes.quiz_routes import quiz_routes

api = Blueprint('api', __name__, url_prefix='/api')

api.register_blueprint(survey_routes)
api.register_blueprint(group_routes)
api.register_blueprint(quiz_routes)


@api.get("/ping")
def ping():
    return "pong"


@api.errorhandler(Exception)
def handle_exception(exception):
    if isinstance(exception, HTTPException):
        return exception

    return handle_http_exception(InternalServerError())


@api.errorhandler(HTTPException)
def handle_http_exception(exception):
    """Return JSON instead of HTML for HTTP errors."""
    return jsonify({
        "code": exception.code,
        "name": exception.name,
        "description": exception.description,
    }), exception.code
