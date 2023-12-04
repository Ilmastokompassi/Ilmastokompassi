from flask import Blueprint

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
