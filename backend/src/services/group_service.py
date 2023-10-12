from src.repositories.group_repository import default_group_repository

class GroupService:
    # pylint: disable=too-few-public-methods
    
    def __init__(self, group_repository=default_group_repository):
        self.group_repository = group_repository
        
    def save_group(self, token):
        try:
            self.group_repository.save_group(token)
        except Exception as error: # pylint: disable=broad-except
            raise error
        
        return token
    
default_group_service = GroupService(default_group_repository)