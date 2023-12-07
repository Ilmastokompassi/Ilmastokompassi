from src.repositories.group_repository import default_group_repository


class GroupService:
    # pylint: disable=too-few-public-methods

    def __init__(self, group_repository=default_group_repository):
        self.group_repository = group_repository

    def save_group(self, token):
        self.group_repository.save_group(token)

    def check_if_group_exists(self, token):
        result = self.group_repository.check_if_group_exists(token)
        return result

    def is_group_name_valid(self, token):
        if token == '':
            return False
        if len(token) > 10:
            return False
        if not token.isupper() and not token.isdigit():
            return False
        return True

    def insert_group_token_to_responses(self, token, response_id):
        self.group_repository.insert_group_token_to_responses(
            token, response_id)

    def fetch_scores_by_group(self, token):
        scores = self.group_repository.fetch_scores_by_group(token)

        final_score, response_amount = self._list_to_dict_and_response_amount(
            scores)
        return final_score, response_amount

    def _list_to_dict_and_response_amount(self, scores):
        # Turn score from list of tuples into dict
        # e.g. [(50, 1), (75, 2), ..] =>
        # {1: 50, 2: 75, .. }
        # And get amount of how many responses per id there is
        final_score = {}
        response_ids = set()
        for score, profile_id, response_id in scores:
            response_ids.add(response_id)
            if profile_id not in final_score:
                final_score[profile_id] = score
            else:
                final_score[profile_id] += score
        response_amount = len(response_ids)
        return final_score, response_amount


default_group_service = GroupService(default_group_repository)
