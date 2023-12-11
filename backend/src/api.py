from flask import Blueprint, jsonify, current_app
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


@api.get("/config")
def config():
    return jsonify({
        "environment": current_app.config["ENVIRONMENT"],
        "baseUrl": current_app.config["BASE_URL"],
    })


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
