from src.repositories.group_repository import default_group_repository


class GroupService:
    # pylint: disable=too-few-public-methods

    def __init__(self, group_repository=default_group_repository):
        self.group_repository = group_repository

    def save_group(self, token):
        try:
            self.group_repository.save_group(token)
        except Exception as error:  # pylint: disable=broad-except
            raise error

        return token

    def check_if_group_exists(self, token):
        try:
            result = self.group_repository.check_if_group_exists(token)
            return result
        except Exception as error:
            raise error

    def is_group_name_valid(self, token):
        if token == '':
            return False
        if len(token) > 10:
            return False
        if not token.isupper() and not token.isdigit():
            return False
        return True

    def insert_group_token_to_responses(self, token, response_id):
        try:
            self.group_repository.insert_group_token_to_responses(
                token, response_id)
        except Exception as error:
            raise error

    def fetch_scores_by_group(self, token):
        try:
            scores = self.group_repository.fetch_scores_by_group(token)

            # Turn score from list of tuples into dict
            # e.g. [(50, 1), (75, 2), ..] =>
            # {1: 50, 2: 75, .. }
            final_score = {}
            for score, profile_id in scores:
                if profile_id not in final_score:
                    final_score[profile_id] = score
                else:
                    final_score[profile_id] += score

            return final_score
        except Exception as error:
            raise error


default_group_service = GroupService(default_group_repository)
