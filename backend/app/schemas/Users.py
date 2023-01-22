from pydantic import BaseModel
from enum import Enum

DEFAULT_PASSWORD = 'default'

class UserPrivilege(str, Enum):
    UTILISATEUR: str = "utilisateur"
    RESPONSABLE: str = "responsable"

class Users(BaseModel):
    login : str
    password : str
    privilege : UserPrivilege
    
class UsersIn(Users):
    pass

class UsersOut(Users):
    id : int