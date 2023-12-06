from flask import Blueprint, jsonify, request
from werkzeug.exceptions import BadRequest, NotFound, Conflict
from src.services.group_service import default_group_service

group_routes = Blueprint('group', __name__, url_prefix='/groups')


@group_routes.get('/<string:group_token>')
def get_group(group_token):
    if not default_group_service.check_if_group_exists(group_token):
        raise NotFound("Group not found")

    return jsonify({"group_token": group_token})


@group_routes.post('/new')
def new_group():
    data = request.get_json()
    token = data.get('groupToken')

    if not default_group_service.is_group_name_valid(token):
        return BadRequest("Invalid group name")

    if default_group_service.check_if_group_exists(token):
        raise Conflict("Group already exists")

    default_group_service.save_group(token)
    return jsonify({"group_token": token}), 201


@group_routes.get('/<string:group_token>/score')
def get_group_score(group_token):
    if not default_group_service.check_if_group_exists(group_token):
        raise NotFound("Group not found")

    score, response_amount = default_group_service.fetch_scores_by_group(
        group_token)
    return jsonify(score=score, response_amount=response_amount)
