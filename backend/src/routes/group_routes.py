from flask import Blueprint, jsonify, request
from src.services.group_service import default_group_service

group_routes = Blueprint('group', __name__, url_prefix='/groups')


@group_routes.get('/<string:group_token>')
def get_group(group_token):
    try:
        group_token = default_group_service.check_if_group_exists(group_token)
        return jsonify(group_token=group_token)
    except Exception:  # pylint: disable=broad-except
        return jsonify(error="Something went wrong!"), 500


@group_routes.post('/new')
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


@group_routes.get('/<string:group_token>/survey/summary')
def get_role_survey_summary(group_token):
    try:
        if not default_group_service.check_if_group_exists(group_token):
            return jsonify({"status": "fail",
                            "message": "Group does not exist"}), 400
        return jsonify({"status": "success",
                        "message": "Group exists"})
    except Exception:  # pylint: disable=broad-except
        return jsonify(error="Something went wrong!"), 500


@group_routes.get('/<string:group_token>/score')
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
