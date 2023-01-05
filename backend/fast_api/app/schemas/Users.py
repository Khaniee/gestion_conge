from pydantic import BaseModel
from enum import Enum

class UserPrivilege(str, Enum):
    UTILISATEUR: str = "Utilisateur"
    RESPONSABLE: str = "Responsable"

class Users(BaseModel):
    login : str
    password : str
    privilege : UserPrivilege
    
class UsersIn(Users):
    pass

class UsersOut(Users):
    id : int